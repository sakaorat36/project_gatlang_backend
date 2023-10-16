const Joi = require("joi");

const updatePaymentStatusSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  paymentStatus: Joi.string().trim().valid("PROCESSING", "PAID"),
});

module.exports = { updatePaymentStatusSchema };
