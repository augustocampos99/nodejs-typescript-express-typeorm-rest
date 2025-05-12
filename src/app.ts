import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata"
import { pgSQLDataSource } from "./configs/pg-data-sourse";
import productRouter from "./routers/product.router";

dotenv.config();

// Establish database connection
pgSQLDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routers
app.use(productRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

