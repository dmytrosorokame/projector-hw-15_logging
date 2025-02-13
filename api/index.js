const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();

const DB_HOST = process.env.DB_HOST || "mysql";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "example";
const DB_DATABASE = process.env.DB_DATABASE || "mydb";

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("My SQL is connected"))
  .catch((err) => console.error("Failed to connect to mySQL server", err));

app.get("/slow-query", async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT SLEEP(2) AS sleep_result");

    res.json({ message: "Slow query is finished", result: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to do slow query" });
  }
});

app.get("/", (req, res) => {
  res.send("Health");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
