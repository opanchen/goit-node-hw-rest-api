const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection is successful.");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(`Database connection error: \n${error.message}`);
    process.exit(1);
  });
