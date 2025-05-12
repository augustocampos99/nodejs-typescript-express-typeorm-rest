import { pgSQLDataSource } from "../configs/pg-data-sourse";
import { BaseResultDto } from "../dtos/base-result.dto";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { CategoryEntity } from "../entities/category.entity";
import crypto from "crypto";

export class CategoryService {

  public async getAll(): Promise<BaseResultDto<CategoryEntity[]>> {
    try {
      let categoryList = await pgSQLDataSource.getRepository(CategoryEntity).find();
      const result: BaseResultDto<CategoryEntity[]> = { success: true, message: "", data: categoryList };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async getByGuid(guid: string): Promise<BaseResultDto<CategoryEntity>> {
    try {
      let category = await pgSQLDataSource.getRepository(CategoryEntity).findOneBy({ guid: guid });
      const result: BaseResultDto<CategoryEntity> = { success: true, message: "", data: category };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async create(categoryDto: CreateCategoryDto): Promise<BaseResultDto<CategoryEntity>> {
    try {
      let category = new CategoryEntity();
      category.guid = crypto.randomUUID();
      category.name = categoryDto.name;
      category.createdAt = new Date();
      category.updatedAt = new Date();

      let categoryResult = await pgSQLDataSource.getRepository(CategoryEntity).save(category);

      const result: BaseResultDto<CategoryEntity> = { success: true, message: "", data: categoryResult };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async update(guid: string, categoryDto: CreateCategoryDto): Promise<BaseResultDto<CategoryEntity>> {
    try {
      let category = await pgSQLDataSource.getRepository(CategoryEntity).findOneBy({ guid: guid });

      if(category === null) {
        return { success: false, message: "Category not found", data: null } as BaseResultDto<CategoryEntity>;
      }

      category.name = categoryDto.name;
      category.updatedAt = new Date();

      let categoryResult = await pgSQLDataSource.getRepository(CategoryEntity).save(category);

      const result: BaseResultDto<CategoryEntity> = { success: true, message: "", data: categoryResult };
      return result;
    } 
    catch (error: any) {
      throw new Error(`Processing error: ${ error }`);
    }  
  }

  public async delete(guid: string): Promise<BaseResultDto<boolean>> {
    try {
      let result = await pgSQLDataSource.getRepository(CategoryEntity).delete({ guid: guid });
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
