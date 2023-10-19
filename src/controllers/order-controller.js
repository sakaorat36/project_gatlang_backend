const prisma = require("../models/prisma");
// const createError = require("../utils/create-error");
const {
  createOrderSchema,
  updateOrderStatusSchema,
  getOrderByUserIdSchema,
} = require("../validators/order-validator");

exports.createOrder = async (req, res, next) => {
  try {
    const { value, error } = createOrderSchema.validate(req.body);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    /* Called when press Btn-Submit */
    const createOrderProduct = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalPrice: value.totalPrice,
        createdAt: value.createdAt,
        slipURL: value.slipURL,
        orderStatus: value.orderStatus,
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

// exports.updateOrder = async (req, res, next) => {
//   try {
//     const { value, error } = updateOrderSchema.validate(req.body);

//     if (error) {
//       error.statusCode = 400;
//       return next(error);
//     }

//     const order = await prisma.order.findFirst({
//       where: {
//         id: value.orderId,
//       },
//     });

//     if (!order) {
//       const error = new Error("order not found");
//       error.statusCode = 400;

//       return next(error);
//     }

//     await prisma.orderDetail.deleteMany({
//       where: {
//         orderId: value.orderId,
//       },
//     });

//     await prisma.order.delete({
//       where: {
//         id: value.orderId,
//       },
//     });

//     const newOrder = await prisma.order.create({
//       data: {
//         userId: req.user.id,

//         totalPrice: value.totalPrice,
//         orderDetail: {
//           create: [...value.orderDetail],
//         },
//       },
//       include: {
//         orderDetail: true,
//       },
//     });

//     res.status(201).json({ newOrder });
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { value, error } = updateOrderStatusSchema.validate(req.body);

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
        orderStatus: value.orderStatus,
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

exports.getOrderByUserId = async (req, res) => {
  try {
    const { value, error } = getOrderByUserIdSchema.validate(req.params);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    const order = await prisma.order.findMany({
      where: {
        userId: value.userId,
      },
      select: {
        id: true,
        totalPrice: true,
        slipURL: true,
        orderStatus: true,
        paymentStatus: true,
        orderDetail: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      const error = new Error("order not found");
      error.statusCode = 400;

      return next(error);
    }

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        totalPrice: true,
        slipURL: true,
        orderStatus: true,
        paymentStatus: true,
        orderDetail: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(201).json({ orders });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
