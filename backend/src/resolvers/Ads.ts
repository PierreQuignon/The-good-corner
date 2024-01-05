import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Ad, AdInput, AdUpdateInput, AdsWhere } from "../entities/Ad";
import { merge } from "../utils";
import { validate } from "class-validator";
import { In } from "typeorm";
import { ContextType } from "../auth";

@Resolver(Ad)
export class AdsResolver {
  @Authorized()
  @Query(() => [Ad])
  async allAds(
    @Arg("where", { nullable: true }) where?: AdsWhere
  ): Promise<Ad[]> {
    const queryWhere: any = {};

    if (where?.categoryIn) {
      queryWhere.category = { id: In(where.categoryIn) };
    }

    const ads = await Ad.find({
      where: queryWhere,
      relations: {
        category: true,
        tags: true,
        createdBy: true,
      },
    });
    return ads;
  }

  @Authorized()
  @Query(() => Ad, { nullable: true })
  async ad(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { category: true, tags: true },
    });
    return ad;
  }

  @Query(() => [Ad])
  async adsByCategory(
    @Arg("categoryId", () => ID) categoryId: number
  ): Promise<Ad[]> {
    const ads = await Ad.find({
      where: { category: { id: categoryId } },
      relations: { tags: true, category: true, createdBy: true },
    });
    return ads;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Ctx() context: ContextType,
    @Arg("data", () => AdInput) data: AdInput
  ): Promise<Ad> {
    try {
      const newAd = new Ad();
      Object.assign(newAd, data, { createdBy: context.user });
      newAd.createdAt = new Date().toISOString().split("T")[0];
      await newAd.save();
      return newAd;
    } catch (error) {
      throw new Error(`An error occured: ${error}`);
    }
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Ctx() context: ContextType,
    @Arg("id", () => ID) id: number,
    @Arg("data") data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { tags: true, createdBy: true },
    });

    if (ad && ad.createdBy.id === context.user?.id) {
      merge(ad, data);

      const errors = await validate(ad);
      if (errors.length === 0) {
        await Ad.save(ad);
        return await Ad.findOne({
          where: { id: id },
          relations: {
            category: true,
            tags: true,
            createdBy: true,
          },
        });
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      return null;
    }
    return ad;
  }

  @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
    });
    if (ad) {
      await ad.remove();
      ad.id = id;
    }
    return ad;
  }
}
