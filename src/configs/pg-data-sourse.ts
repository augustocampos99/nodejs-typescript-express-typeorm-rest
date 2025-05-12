import { DataSource } from "typeorm"
import { ProductEntity } from "../entities/product.entity"
import { environment } from "../environments/develop.env";
import { CategoryEntity } from "../entities/category.entity";

export const pgSQLDataSource = new DataSource({
    type: "postgres",
    host: environment.POSTGRES_HOST,
    port: environment.POSTGRES_PORT,
    username: environment.POSTGRES_USER,
    password: environment.POSTGRES_PASSWORD,
    database: environment.POSTGRES_DATABASE,
    logging: true,
    synchronize: false,
    entities: [
      ProductEntity,
      CategoryEntity
    ],
});
