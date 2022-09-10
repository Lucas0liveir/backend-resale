import * as dotenv from 'dotenv';
import express, { Request, Response } from "express";

const PORT = process.env.PORT || 3003
const app = express()

app.get('/', (req: Request, res: Response) => {
    return res.send("hello World")
})

app.listen(PORT, () => console.log('Rodando na porta ' + PORT))