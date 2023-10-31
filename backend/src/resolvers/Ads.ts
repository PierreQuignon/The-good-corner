import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdInput } from "../entities/Ad";

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad])
  async allAds(): Promise<Ad[]> {
    const ads = await Ad.find({
      relations: { tags: true, category: true },
    });
    return ads;
  }

  @Mutation(() => Ad)
  async createAd(@Arg("data", () => AdInput) data: AdInput): Promise<Ad> {
    try {
      const newAd = new Ad();
      Object.assign(newAd, data);
      newAd.createdAt = new Date().toISOString().split("T")[0];
      await newAd.save();
      return newAd;
    } catch (error) {
      throw new Error(`An error occured: ${error}`);
    }
  }
}
