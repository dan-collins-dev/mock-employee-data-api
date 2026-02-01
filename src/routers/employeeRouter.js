import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const employeeRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const employeesPath = path.join(
    __dirname,
    "../data/mock-employee-data.json"
);

async function getAllEmployees() {
    try {
        const employeeData = await fs.readFile(employeesPath, "utf-8");
        const employees = JSON.parse(employeeData);

        return employees;
    } catch (error) {
        console.log(error);
    }
}

async function getEmployeeById(employeeId) {
    try {
        const id = parseInt(employeeId);

        const employeeData = await fs.readFile(employeesPath, "utf-8");
        const employees = JSON.parse(employeeData);
        const employee = employees.find(emp => emp.id === id);

        return employee;
    } catch (error) {
        console.log(error);
    }
}

employeeRouter.get("/", async (req, res) => {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
});

employeeRouter.get("/:id", async (req, res) => {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) {
        return res.status(404).json("Employee does not exist");
    }

    res.status(200).json(employee);
});

export default employeeRouter;
