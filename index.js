import express from "express";
import path from "path";
const __dirname = path.resolve();
import dotenv from "dotenv";
import router from "./routes.js";

import connectDB from "./src/helper/databaseConnection.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
router(app);

connectDB();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


