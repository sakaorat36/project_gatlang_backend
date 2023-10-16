require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error");
const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/product-route");
const orderRoute = require("./routes/order-route");
const paymentRoute = require("./routes/payment-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
