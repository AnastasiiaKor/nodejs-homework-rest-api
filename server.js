const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://anastasiia:yBAnjpsWsrj1etst@cluster0.amaego9.mongodb.net/Contacts_reader?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
