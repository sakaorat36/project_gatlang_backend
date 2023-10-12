const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const {
  createOrderSchema,
  updateOrderSchema,
} = require("../validators/order-validator");

exports.createOrder = async (req, res, next) => {
  try {
    const { value, error } = createOrderSchema.validate(req.body);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    const createOrderProduct = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalPrice: value.totalPrice,
        createdAt: value.createdAt,
        slipURL: value.slipURL,
        productStatus: value.productStatus,
        paymentStatus: value.paymentStatus,
        orderDetail: {
          create: [...value.orderDetail],
        },
      },
      include: {
        orderDetail: true,
      },
    });
    res.status(201).json({ createOrderProduct });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { value, error } = updateOrderSchema.validate(req.body);

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

    await prisma.orderDetail.deleteMany({
      where: {
        orderId: value.orderId,
      },
    });

    await prisma.order.delete({
      where: {
        id: value.orderId,
      },
    });

    const newOrder = await prisma.order.create({
      data: {
        userId: req.user.id,

        totalPrice: value.totalPrice,
        orderDetail: {
          create: [...value.orderDetail],
        },
      },
      include: {
        orderDetail: true,
      },
    });

    res.status(201).json({ newOrder });
  } catch (error) {
    next(error);
  }
};
