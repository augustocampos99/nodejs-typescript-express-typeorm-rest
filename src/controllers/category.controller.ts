import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { BaseResultDto } from "../dtos/base-result.dto";
import { validationResult } from "express-validator";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { BaseErrorResponse } from "../contracts/base-error-response";

export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {
  }

  public async getAll(req: Request, res: Response) {
    try {
      const result = await this.categoryService.getAll();

      res.status(200).send(result.data);        
    } 
    catch (error: any) {
      const response = { code: 500, message: error.message } as BaseErrorResponse;
      res.status(500).send(response);
    }
  }

  public async getByGuid(req: Request, res: Response) {
    try {
      const result = await this.categoryService.getByGuid(req.params.guid);

      if(result.success === false) {
        res.status(404).send();
      }

      res.status(200).send(result.data);        
    } 
    catch (error: any) {
      const response = { code: 500, message: error.message } as BaseErrorResponse;
      res.status(500).send(response);
    }
  }

  public async create(req: Request, res: Response) {
    try {

      const validatorError = validationResult(req);
      if (!validatorError.isEmpty()) {
        return res.status(400).json({
          message: "Errors",
          errors: validatorError.array(),
        });
      }

      const data = {
        name: req.body.name,
      } as CreateCategoryDto;

      const result = await this.categoryService.create(data);
  
      if(result.success === false) {
        const response = { code: 400, message: result.message } as BaseErrorResponse;
        res.status(400).send(response);
        return;
      }
  
      return res.status(201).send(result.data);          
    } 
    catch (error: any) {
      const response = { code: 500, message: error.message } as BaseErrorResponse;
      res.status(500).send(response);
    }
  }

  public async update(req: Request, res: Response) {
    try {

      const validatorError = validationResult(req);
      if (!validatorError.isEmpty()) {
        return res.status(400).json({
          message: "Errors",
          errors: validatorError.array(),
        });
      }

      const data = {
        name: req.body.name,
      } as CreateCategoryDto;

      const result = await this.categoryService.update(req.params.guid, data);
  
      if(result.success === false) {
        const response = { code: 400, message: result.message } as BaseErrorResponse;
        res.status(400).send(response);
        return;
      }
  
      return res.status(200).send(result.data);          
    } 
    catch (error: any) {
      const response = { code: 500, message: error.message } as BaseErrorResponse;
      res.status(500).send(response);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const result = await this.categoryService.delete(req.params.guid);

      res.status(200).send(result.data);        
    } 
    catch (error: any) {
      const response = { code: 500, message: error.message } as BaseErrorResponse;
      res.status(500).send(response);
    }
  }

}
