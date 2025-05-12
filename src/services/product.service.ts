import { pgSQLDataSource } from "../configs/pg-data-sourse";
import { BaseResultDto } from "../dtos/base-result.dto";
import { CreateProductDto } from "../dtos/create-product.dto";
import { CategoryEntity } from "../entities/category.entity";
import { ProductEntity } from "../entities/product.entity";
import crypto from "crypto";

export class ProductService {

  public async getAll(): Promise<BaseResultDto<ProductEntity[]>> {
    try {
      let productList = await pgSQLDataSource.getRepository(ProductEntity).find();
      const result: BaseResultDto<ProductEntity[]> = { success: true, message: "", data: productList };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async getByGuid(guid: string): Promise<BaseResultDto<ProductEntity>> {
    try {
      let product = await pgSQLDataSource.getRepository(ProductEntity).findOneBy({ guid: guid });
      const result: BaseResultDto<ProductEntity> = { success: true, message: "", data: product };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async create(productDto: CreateProductDto): Promise<BaseResultDto<ProductEntity>> {
    try {
      let category = await pgSQLDataSource.getRepository(CategoryEntity).findOneBy({ id: productDto.categoryId });
      if(category === null) {
        return { success: false, message: "Category not found", data: null } as BaseResultDto<ProductEntity>;
      }

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

      let productResult = await pgSQLDataSource.getRepository(ProductEntity).save(product);

      const result: BaseResultDto<ProductEntity> = { success: true, message: "", data: productResult };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async update(guid: string, productDto: CreateProductDto): Promise<BaseResultDto<ProductEntity>> {
    try {
      let category = await pgSQLDataSource.getRepository(CategoryEntity).findOneBy({ id: productDto.categoryId });
      if(category === null) {
        return { success: false, message: "Category not found", data: null } as BaseResultDto<ProductEntity>;
      }

      let product = await pgSQLDataSource.getRepository(ProductEntity).findOneBy({ guid: guid });
      if(product === null) {
        return { success: false, message: "Product not found", data: null } as BaseResultDto<ProductEntity>;
      }

      product.categoryId = productDto.categoryId;
      product.name = productDto.name;
      product.description = productDto.description;
      product.status = productDto.status;
      product.price = productDto.price;
      product.quantity = productDto.quantity;  
      product.updatedAt = new Date();

      let productResult = await pgSQLDataSource.getRepository(ProductEntity).save(product);

      const result: BaseResultDto<ProductEntity> = { success: true, message: "", data: productResult };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async delete(guid: string): Promise<BaseResultDto<boolean>> {
    try {
      let result = await pgSQLDataSource.getRepository(ProductEntity).delete({ guid: guid });
      if(result.affected !== null && result.affected !== undefined && result.affected > 0) {
        return { success: true, message: "", data: true } as BaseResultDto<boolean>;
      }

      return { success: false, message: "", data: false } as BaseResultDto<boolean>;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

}
