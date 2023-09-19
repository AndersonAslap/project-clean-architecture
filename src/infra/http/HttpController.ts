import { UseCaseFactory } from "../factory/UseCaseFactory";
import { CustomerPresenter } from "../presenter/CustomerPresenter";
import { HttpServer } from "./HttpServer";

export class HttpController {

    constructor(httpServer: HttpServer, useCaseFactory:UseCaseFactory) {

        httpServer.on('get', '/customers', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseFindAllCustomer()
            let output = await usecase.execute()
            if (headers['accept'] === "application/xml") {
                output = CustomerPresenter.toXML(output)
            }
            return output
        })

        httpServer.on('post', '/customer', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseCreateCustomer()
            const output = await usecase.execute(body)
            return output
        })

        httpServer.on('get', '/customer/:id', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseFindCustomerById()
            const output = await usecase.execute(params)
            return output
        })

        httpServer.on('put', '/customer', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseUpdateCustomer()
            const output = await usecase.execute(body)
            return output
        })

        httpServer.on('get', '/products', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseFindAllProduct()
            const output = await usecase.execute()
            return output
        })

        httpServer.on('post', '/product', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseCreateProduct()
            const output = await usecase.execute(body)
            return output
        })

        httpServer.on('get', '/product/:id', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseFindProductById()
            const output = await usecase.execute(params)
            return output
        })

        httpServer.on('put', '/product', async (params:any, body:any, headers:any) => {
            const usecase = useCaseFactory.createUseCaseUpdateProduct()
            const output = await usecase.execute(body)
            return output
        })
    }
}