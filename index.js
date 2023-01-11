const server = require("./utils/app");
const connectDB = require("./config/db.js");
connectDB.connectDB();

const app = server.createServer();

app.listen(
  process.env.PORT || 5000,
  console.log(`server running on port ${process.env.PORT}`)
);