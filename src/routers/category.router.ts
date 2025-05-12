import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/category.service";
import { createCategoryValidator } from "../validators/category.validator";

// Dependency Injection
const categoryController = new CategoryController(new CategoryService());

// Routers
const categoryRouter = Router();
categoryRouter.get("/api/categories", categoryController.getAll.bind(categoryController));
categoryRouter.get("/api/categories/:guid", categoryController.getByGuid.bind(categoryController));
categoryRouter.post("/api/categories", createCategoryValidator, categoryController.create.bind(categoryController));
categoryRouter.put("/api/categories/:guid", createCategoryValidator, categoryController.update.bind(categoryController));
categoryRouter.delete("/api/categories/:guid", categoryController.delete.bind(categoryController));

export default categoryRouter;
