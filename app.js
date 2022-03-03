const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from server",
  });
});

app.listen(port, () => {
  console.log(`App is running on PORT ${port}`);
});
