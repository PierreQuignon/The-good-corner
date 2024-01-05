import { IsEmail, Matches } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 255, unique: true })
  @IsEmail()
  email!: string;

  @Column({ length: 255 })
  hashedPassword!: string;

  @OneToMany(() => Ad, (ad) => ad.createdBy)
  @Field(() => [Ad])
  ads!: Ad[];
}

@InputType()
export class UserCreateInput {
  @Field()
  email!: string;

  @Field()
  @Matches(/^.{8,50}$/)
  password!: string;
}
