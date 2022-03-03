const mongoose = require("mongoose");
const serverDbConnect = ()=>{
    mongoose
  .connect(
    "mongodb+srv://classApp-backEnd:gcattkQ7iKzfNWc9@cluster0.wyn7x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to DB.");
  })
  .catch((error) => {
    console.log(`connection with DB error====>${error}`);
  });
}

module.exports = serverDbConnect;