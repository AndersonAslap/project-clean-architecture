import express, { Request, Response } from 'express'
import { HttpServer } from "./HttpServer";

export class ExpressAdapter implements HttpServer {

    readonly server: any

    constructor() {
        this.server = express()
        this.server.use(express.json())
    }
    
    on(method: string, url: string, callback: Function): void {
        this.server[method](url, async (request: Request, response: Response) => {
            try {
                const output = await callback(request.params, request.body, request.headers);
                response.json(output)
            } catch(error: any) {
                response.status(400).json({message: error.message})
            }
        })
    }
    
    listen(port: number): void {
        this.server.listen(port)
    }
}