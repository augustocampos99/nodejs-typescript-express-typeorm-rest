import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { BaseResultDto } from "../dtos/base-result.dto";
import { validationResult } from "express-validator";
import { CreateProductDto } from "../dtos/create-product.dto";

export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  public async getAll(req: Request, res: Response) {
    try {
      const result = await this.productService.getAll();

      const response: BaseResultDto = { success: true, message: "", data: result };
      res.status(200).send(response);        
    } 
    catch (error) {
      res.send()
    }
  }

  public async getByGuid(req: Request, res: Response) {
    try {
      const result = await this.productService.getByGuid(req.params.guid);

      if(result === null) {
        res.status(404).send();
      }

      const response: BaseResultDto = { success: true, message: "", data: result };
      res.status(200).send(response);        
    } 
    catch (error) {
      res.send()
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
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        price: req.body.price,
        quantity: req.body.quantity,
      } as CreateProductDto;

      const result = await this.productService.create(data);
  
      const response: BaseResultDto = { success: true, message: "", data: result };

      return res.status(201).send(response);          
    } 
    catch (error: any) {
      const response: BaseResultDto = { success: false, message: error.message, data: null };
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
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        price: req.body.price,
        quantity: req.body.quantity,
      } as CreateProductDto;

      const result = await this.productService.update(req.params.guid, data);
  
      const response: BaseResultDto = { success: true, message: "", data: result };

      if(result === null) {
        res.status(404).send();
      }

      return res.status(200).send(response);          
    } 
    catch (error: any) {
      const response: BaseResultDto = { success: false, message: error.message, data: null };
      res.status(500).send(response);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const result = await this.productService.delete(req.params.guid);

      const response: BaseResultDto = { success: result, message: "", data: null };
      res.status(200).send(response);        
    } 
    catch (error) {
      res.send()
    }
  }

}
