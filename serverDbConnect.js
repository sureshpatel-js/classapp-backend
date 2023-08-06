const mongoose = require("mongoose");
const serverDbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://dbname:pass@cluster0.3fpiu.mongodb.net/?retryWrites=true&w=majority"
    
    )
    .then(() => {
      console.log("connected to DB.");
    })
    .catch((error) => {
      console.log(`connection with DB error====>${error}`);
    });
}

module.exports = serverDbConnect;
