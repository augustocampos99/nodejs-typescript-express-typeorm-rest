import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { BaseResultDto } from "../dtos/base-result.dto";
import { validationResult } from "express-validator";
import { CreateProductDto } from "../dtos/create-product.dto";
import { BaseErrorResponse } from "../contracts/base-error-response";

export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  public async getAll(req: Request, res: Response) {
    try {
      const result = await this.productService.getAll();

      res.status(200).send(result.data);        
    } 
    catch (error: any) {
      const response = { code: 500, message: error.message } as BaseErrorResponse;
      res.status(500).send(response);
    }
  }

  public async getByGuid(req: Request, res: Response) {
    try {
      const result = await this.productService.getByGuid(req.params.guid);

      if(result.success === false) {
        res.status(404).send();
        return;
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
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        price: req.body.price,
        quantity: req.body.quantity,
      } as CreateProductDto;

      const result = await this.productService.create(data);

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
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        price: req.body.price,
        quantity: req.body.quantity,
      } as CreateProductDto;

      const result = await this.productService.update(req.params.guid, data);
  
      if(result.success === false && result.message.length === 0) {
        res.status(404).send();
        return;
      }
  
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
      const result = await this.productService.delete(req.params.guid);

      res.status(200).send(result.data);        
    } 
    catch (error: any) {
      const response = { code: 500, message: error.message } as BaseErrorResponse;
      res.status(500).send(response);
    }
  }

}
