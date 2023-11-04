require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// app.use(cors());

app.use(
  cors({
    origin: "*",
  })
);

// app.use((req, res, next) => {
//   const allowedOrigins = [
//     "http://127.0.0.1:8020",
//     "http://localhost:3000",
//     "https://ross-lemon.vercel.app/",
//     "http://localhost:9000",
//     "https://www.suite.mightyegor.com/",
//     "https://www.frontend.rossdev.xyz/",
//     "https://www.admin.rossdev.xyz/",
//     "https://www.frontend.mightyegor.com/",
//     "https://www.rossdev.xyz/",
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//   res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   // res.header("Access-Control-Allow-Credentials", true);
//   return next();
// });

app.use(express.json());
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));

// routes
require("./upload.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
