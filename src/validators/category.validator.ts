import { body } from 'express-validator';

export const createCategoryValidator = [
  body("name")
  .exists({ checkFalsy: true })
  .withMessage("name is required")
  .isString()
  .withMessage("name should be string"),
];

