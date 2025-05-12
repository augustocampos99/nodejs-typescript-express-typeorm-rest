import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products" })
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "guid" })
  guid: string;

  @Column({ name: "category_id" })
  categoryId: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "description" })
  description: string;

  @Column({ name: "price" })
  price: number;

  @Column({ name: "quantity" })
  quantity: number;

  @Column({ name: "status" })
  status: number;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

}