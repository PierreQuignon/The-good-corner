import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryInput } from "../entities/Category";

@Resolver(Category)
export class CategoriessResolver {
  @Query(() => [Category])
  async allCategories(): Promise<Category[]> {
    const categories = await Category.find({
      relations: { ads: true },
    });
    return categories;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data", () => CategoryInput) data: CategoryInput
  ): Promise<Category> {
    try {
      const newCategory = new Category();
      Object.assign(newCategory, data);
      newCategory.createdAt = new Date().toISOString().split("T")[0];
      await newCategory.save();
      return newCategory;
    } catch (error) {
      throw new Error(`An error occured: ${error}`);
    }
  }
}
