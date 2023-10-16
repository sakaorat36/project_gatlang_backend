const prisma = require("../models/prisma");

const {
  updatePaymentStatusSchema,
} = require("../validators/payment-validator");

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { value, error } = updatePaymentStatusSchema.validate(req.body);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    const order = await prisma.order.findFirst({
      where: {
        id: value.orderId,
      },
    });

    if (!order) {
      const error = new Error("order not found");
      error.statusCode = 400;

      return next(error);
    }

    const editStatus = await prisma.order.update({
      data: {
        paymentStatus: value.paymentStatus,
      },
      where: {
        id: value.orderId,
      },
    });

    res.status(201).json({ editStatus });
  } catch (error) {
    next(error);
  }
};
