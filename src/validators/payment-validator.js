const Joi = require("joi");

const updatePaymentStatusSchema = Joi.object({
  paymentStatus: Joi.string().trim().valid("PROCESSING", "PAID"),
});

module.exports = { updatePaymentStatusSchema };
