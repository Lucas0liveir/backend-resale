import "reflect-metadata";
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./shared/container"
import { AppError } from "./shared/error";
import { accounts } from "./shared/infra/http/routes/account.routes";
import { router } from "./shared/infra/http/routes";

const PORT = process.env.PORT || 3003

const app = express()

app.use(express.json())

app.use(router)

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

app.listen(PORT, () => console.log('Rodando na porta ' + PORT))