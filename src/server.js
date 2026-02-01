import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const employeesPath = path.join(__dirname, "../mock-employee-data.json");
const employees = JSON.parse(fs.readFileSync(employeesPath, "utf-8"));

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/employees", (req, res) => {
    res.status(200).json(employees);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});