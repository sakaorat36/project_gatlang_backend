const Joi = require("joi");

const createOrderSchema = Joi.object({
  totalPrice: Joi.number().integer().positive(),
  slipURL: Joi.string(),
  orderStatus: Joi.string().trim().valid("COOKING", "COMPLETE"),
  paymentStatus: Joi.string().trim().valid("PROCESSING", "PAID"),
  orderDetail: Joi.string(),
});

const updateOrderStatusSchema = Joi.object({
  orderStatus: Joi.string().trim().valid("COOKING", "COMPLETE"),
});

const getOrderByUserIdSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  getOrderByUserIdSchema,
};
