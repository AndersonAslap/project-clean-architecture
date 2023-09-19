import { Sequelize } from "sequelize-typescript"
import { RepositoryDatabaseFactory } from "../factory/RepositoryDatabaseFactory";
import { UseCaseFactory } from "../factory/UseCaseFactory";
import { ExpressAdapter } from "./ExpressAdapter";
import { HttpController } from "./HttpController";
import { CustomerModel } from "../repository/customer/database/sequelize/model/CustomerModel";
import { ProductModel } from "../repository/product/database/sequelize/model/ProductModel";

const PORT = parseInt(process.env.PORT) || 3030

setupDb()
const repositoryFactory = new RepositoryDatabaseFactory()
const useCaseFactory = new UseCaseFactory(repositoryFactory)
const httpServer = new ExpressAdapter()
new HttpController(httpServer, useCaseFactory)
httpServer.listen(PORT)

async function setupDb() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'storage/:memory',
        logging: false,
        sync: { force: true }
    });
    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync()
}