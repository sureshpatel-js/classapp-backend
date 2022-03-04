const app = require("./server");
const userRouter = require("./routers/userRoute");

const serverDbConnect = require("./serverDbConnect");
//serverDbConnect();

app.use("/user", userRouter);

app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({
    message: message,
  });
});
