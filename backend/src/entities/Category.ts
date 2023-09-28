import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  type!: string;

  @Column()
  createdAt!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads!: Ad[];
}
