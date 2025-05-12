import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "categories" })
export class CategoryEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "guid" })
  guid: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

}