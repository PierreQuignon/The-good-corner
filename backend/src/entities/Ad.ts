import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column({ length: 100 })
  @Field()
  owner!: string;

  @Column()
  @Field(() => Int)
  price!: number;

  @Column({ length: 100 })
  @Field()
  picture!: string;

  @Column({ length: 100 })
  @Field()
  location!: string;

  @Column()
  @Field()
  createdAt!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  @Field(() => Category, {nullable: true})
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];
}

@InputType()
export class AdInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  owner!: string;

  @Field(() => Int)
  price!: number;

  @Field()
  picture!: string;

  @Field()
  location!: string;

  @Field()
  category!: ObjectId;

  @Field(() => [ObjectId])
  tags!: ObjectId[];
}

@InputType()
export class AdUpdateInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  owner!: string;

  @Field(() => Int)
  price!: number;

  @Field()
  picture!: string;

  @Field()
  location!: string;

  @Field()
  category!: ObjectId;

  @Field(() => [ObjectId])
  tags!: ObjectId[];
}
