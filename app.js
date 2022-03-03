const app = require("./server");
const serverDbConnect = require("./serverDbConnect");
serverDbConnect();
app.use("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from server",
  });
});
