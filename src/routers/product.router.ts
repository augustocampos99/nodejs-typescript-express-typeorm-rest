import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../services/product.service";
import { createProductValidator } from "../validators/product.validator";

// Dependency Injection
const productController = new ProductController(new ProductService());

// Routers
const productRouter = Router();
productRouter.get("/api/products", productController.getAll.bind(productController));
productRouter.get("/api/products/:guid", productController.getByGuid.bind(productController));
productRouter.post("/api/products", createProductValidator, productController.create.bind(productController));
productRouter.put("/api/products/:guid", createProductValidator, productController.update.bind(productController));
productRouter.delete("/api/products/:guid", productController.delete.bind(productController));

export default productRouter;
