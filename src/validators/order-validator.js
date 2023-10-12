const Joi = require("joi");

const createOrderSchema = Joi.object({
  totalPrice: Joi.number().integer().positive().required(),
  slipURL: Joi.string(),
  productStatus: Joi.string().trim().valid("COOKING", "COMPLETE"),
  paymentStatus: Joi.string().trim().valid("PROCESSING", "PAID"),
  orderDetail: Joi.array(),
});

const updateOrderSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  totalPrice: Joi.number().integer().positive(),
  orderDetail: Joi.array(),
});

// const deleteOrderSchema = Joi.object({
//   orderId: Joi.number().integer().positive().required(),
// });

module.exports = { createOrderSchema, updateOrderSchema };
