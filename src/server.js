import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import employeeRouter from "./routers/employeeRouter.js";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/employees", employeeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
