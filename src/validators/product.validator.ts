import { body } from 'express-validator';

export const createProductValidator = [
  body("categoryId")
  .exists({ checkFalsy: false })
  .withMessage("categoryId is required")
  .isNumeric()
  .withMessage("categoryId should be string"),

  body("name")
  .exists({ checkFalsy: true })
  .withMessage("name is required")
  .isString()
  .withMessage("name should be string"),

  body("description")
  .exists({ checkFalsy: true })
  .withMessage("description is required")
  .isString()
  .withMessage("description should be string"),

  body("status")
  .exists({ checkFalsy: false })
  .withMessage("status is required")
  .isNumeric()
  .withMessage("status should be number"),

  body("price")
  .exists({ checkFalsy: true })
  .withMessage("price is required")
  .isNumeric()
  .withMessage("price should be date"),

  body("quantity")
  .exists({ checkFalsy: true })
  .withMessage("quantity is required")
  .isNumeric()
  .withMessage("quantity should be date"),
];

