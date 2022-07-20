import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo, Tag } from "./entity/Todo";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Todo, Tag],
    migrations: [],
    subscribers: [],
})
