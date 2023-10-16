const Joi = require("joi");

const createOrderSchema = Joi.object({
  totalPrice: Joi.number().integer().positive().required(),
  slipURL: Joi.string(),
  productStatus: Joi.string().trim().valid("COOKING", "COMPLETE"),
  paymentStatus: Joi.string().trim().valid("PROCESSING", "PAID"),
  orderDetail: Joi.array(),
});

const updateOrderStatusSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  productStatus: Joi.string().trim().valid("COOKING", "COMPLETE"),
});

const getOrderByUserIdSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  getOrderByUserIdSchema,
};
