import "reflect-metadata";
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./shared/container"
import { AppError } from "./shared/error";
import { router } from "./shared/infra/http/routes";

const PORT = process.env.PORT || 3003

const app = express()

app.use(express.json())

app.use(router)
app.get("/", (req, res) => {
    return res.json({message: "ok"})
})

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `internal server error - ${err.message}`
    })
})

app.listen(PORT, () => console.log('Rodando na porta ' + PORT ))