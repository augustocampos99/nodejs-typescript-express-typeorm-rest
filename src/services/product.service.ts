import { pgSQLDataSource } from "../configs/pg-data-sourse";
import { CreateProductDto } from "../dtos/create-product.dto";
import { ProductEntity } from "../entities/product.entity";
import crypto from "crypto";

export class ProductService {

  public async getAll(): Promise<ProductEntity[]> {
    try {
      let result = await pgSQLDataSource.getRepository(ProductEntity).find();
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async getByGuid(guid: string): Promise<ProductEntity | null> {
    try {
      let result = await pgSQLDataSource.getRepository(ProductEntity).findOneBy({ guid: guid });
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async create(productDto: CreateProductDto): Promise<ProductEntity> {
    try {
      let product = new ProductEntity();
      product.categoryId = productDto.categoryId;
      product.name = productDto.name;
      product.description = productDto.description;
      product.status = productDto.status;
      product.price = productDto.price;
      product.quantity = productDto.quantity;

      product.guid = crypto.randomUUID();
      product.createdAt = new Date();
      product.updatedAt = new Date();

      let result = await pgSQLDataSource.getRepository(ProductEntity).save(product);

      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async update(guid: string, productDto: CreateProductDto): Promise<ProductEntity | null> {
    try {
      let product = await pgSQLDataSource.getRepository(ProductEntity).findOneBy({ guid: guid });
      if(product !== null) {
        product.categoryId = productDto.categoryId;
        product.name = productDto.name;
        product.description = productDto.description;
        product.status = productDto.status;
        product.price = productDto.price;
        product.quantity = productDto.quantity;  
        product.updatedAt = new Date();
  
        let result = await pgSQLDataSource.getRepository(ProductEntity).save(product);
  
        return result;  
      }

      return null;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async delete(guid: string): Promise<boolean> {
    try {
      let result = await pgSQLDataSource.getRepository(ProductEntity).delete({ guid: guid });
      if(result.affected !== null && result.affected !== undefined && result.affected > 0) {
        return true;
      }

      return false;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

}
