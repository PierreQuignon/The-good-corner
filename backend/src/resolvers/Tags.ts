import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => [Tag])
  async allTags(): Promise<Tag[]> {
    const tags = await Tag.find({
      relations: { ads: true }
    });
    return tags
  }

  @Mutation(() => Tag)
  async createTag(@Arg("content") content: string): Promise<Tag> {
    try {
      const tg = new Tag();
      tg.content = content;
      tg.createdAt = new Date().toISOString().split("T")[0];
      await tg.save();
      return tg;
    } catch (error) {
      throw new Error(`An error occured: ${error}`);
    }
  }
}
