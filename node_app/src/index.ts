import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';

import { AppRoutes } from './routers';
import { AppDataSource } from "./data-source";
// import { Todo, Tag } from "./entity/Todo";

AppDataSource.initialize().then(async () => {
    console.log('TypeORM 链接成功');

    // console.log('插入新 Tag 到数据库...');
    // const tag1 = new Tag();
    // tag1.name = '优先级：高';
    // tag1.del = false;
    // await AppDataSource.manager.save(tag1);

    // const tag2 = new Tag();
    // tag2.name = '优先级：中';
    // tag2.del = false;
    // await AppDataSource.manager.save(tag2);

    // const tag3 = new Tag();
    // tag3.name = '优先级：低';
    // tag3.del = false;
    // await AppDataSource.manager.save(tag3);

    // console.log('插入一个新 Todo 到数据库...');
    // const todo = new Todo();
    // todo.name = '测试任务';
    // todo.del = false;
    // todo.tags = [tag1, tag2, tag3];
    // await AppDataSource.manager.save(todo);
    // console.log("存入一个新Todo, id: " + todo.id)

    // const loadedTodo = await AppDataSource.getRepository(Todo).find({
    //     where: {
    //         id: 1,
    //     },
    //     relations: {
    //         tags: true,
    //     },
    // });
    // console.log('loadedTodo:', loadedTodo);

    // 执行后端程序
    const app = new Koa();

    const router = new Router();

    // 注册路由
    AppRoutes.forEach(route => router[route.method](route.path, route.action));

    app.use(cors())
        .use(bodyParser())
        .use(router.routes());

    app.listen(7001);

}).catch(error => console.log('TypeORM 链接失败', error));
