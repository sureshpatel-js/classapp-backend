const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`App is running on PORT ${port}`);
});

module.exports = app;
