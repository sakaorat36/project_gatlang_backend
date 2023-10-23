const prisma = require("../models/prisma");
// const createError = require("../utils/create-error");
const {
  createOrderSchema,
  updateOrderStatusSchema,
  getOrderByUserIdSchema,
} = require("../validators/order-validator");
const { upload } = require("../utils/cloundinary-service");

exports.createOrder = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.slipURL = await upload(req.file.path);
    }

    const { value, error } = createOrderSchema.validate(req.body);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    value.orderDetail = JSON.parse(value.orderDetail);

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

exports.updateOrderStatusById = async (req, res, next) => {
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
        id: +req.params.orderId,
      },
    });

    res.status(201).json({ editStatus });
  } catch (error) {
    next(error);
  }
};

exports.getOrderByUserId = async (req, res, next) => {
  try {
    const { value, error } = getOrderByUserIdSchema.validate(req.params);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    const response = await prisma.order.findMany({
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
            amount: true,
          },
        },
      },
    });

    // console.log("response", response);

    if (!response) {
      const error = new Error("order not found");
      error.statusCode = 400;

      return next(error);
    }

    const order = [];

    if (response?.length > 0) {
      response.map((el) => {
        // console.log("element", el);
        el.orderDetail.forEach((item, index) => {
          const result = {
            id: index === 0 ? el.id : "",
            totalPrice: el.totalPrice,
            slipURL: index === 0 ? el.slipURL : "",
            orderStatus: index === 0 ? el.orderStatus : "",
            paymentStatus: index === 0 ? el.paymentStatus : "",
            name: item.product.name,
            amount: item.amount,
          };
          // console.log(result);
          order.push(result);
        });
      });
    }

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const response = await prisma.order.findMany({
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
            amount: true,
          },
        },
      },
    });

    if (!response) {
      const error = new Error("order not found");
      error.statusCode = 400;

      return next(error);
    }

    const orders = [];

    if (response?.length > 0) {
      response.map((el) => {
        if (el.orderDetail?.length > 0) {
          el.orderDetail.forEach((item, index) => {
            orders.push({
              id: index === 0 ? el.id : "",
              totalPrice: index === 0 ? el.totalPrice : "",
              slipURL: index === 0 ? el.slipURL : "",
              orderStatus: index === 0 ? el.orderStatus : "",
              paymentStatus: index === 0 ? el.paymentStatus : "",
              name: item.product.name,
              amount: item.amount,
            });
          });
        }
      });
    }

    res.status(201).json({ orders });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
