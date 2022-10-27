const app = require("./server");
const userRouter = require("./routers/userRoute");
const authRouter = require("./routers/authRoute");
const instituteRouter = require("./routers/instituteRoute");
const standardRouter = require("./routers/standardRoute");
const languageRouter = require("./routers/languageRoute");
const boardRouter = require("./routers/boardRoute");
const serverDbConnect = require("./serverDbConnect");
serverDbConnect();
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/institute", instituteRouter);
app.use("/board", boardRouter)
app.use("/standard", standardRouter);
app.use("/language", languageRouter);

app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({
    message: message,
  });
});
