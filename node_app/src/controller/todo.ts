import { Context } from 'koa';
import { AppDataSource } from "../data-source";
import { Todo, Tag } from "../entity/Todo";

class TodoController {
  // 查询列表
  async list(ctx: Context) {
    const todoRepository = AppDataSource.getRepository(Todo);
    const findTodoList = await todoRepository.find({
      where: {
        del: false,
      },
      relations: {
        tags: true,
      },
    });

    ctx.body = {
      status: 'SUCCESS',
      data: {
        list: findTodoList,
      },
    };
  }

  // 新增
  async add(ctx: Context) {
    const { name } = ctx.request.body;
    const todoData = {
      name,
      del: false,
    };
    const todoRepository = AppDataSource.getRepository(Todo);
    await todoRepository.save(todoData);

    ctx.body = {
      status: 'SUCCESS',
      message: '添加成功',
    };
  }

  // 修改
  async edit(ctx: Context) {
    const { id, name } = ctx.request.body;
    if (id) {
      const todoRepository = AppDataSource.getRepository(Todo);
      const findTodo = await todoRepository.findOneBy({
        id,
      });
      findTodo.name = name;
      await todoRepository.save(findTodo);

      ctx.body = {
        status: 'SUCCESS',
        message: '修改成功',
      };
    } else {
      ctx.body = {
        status: 'FAIL',
        message: '修改失败',
      };
    }
  }

  // 删除
  async del(ctx: Context) {
    const { id } = ctx.request.body;
    if (id) {
      const todoRepository = AppDataSource.getRepository(Todo);
      const findTodo = await todoRepository.findOneBy({
        id,
      });
      findTodo.del = true;
      await todoRepository.save(findTodo);

      ctx.body = {
        status: 'SUCCESS',
        message: '删除成功',
      };
    } else {
      ctx.body = {
        status: 'FAIL',
        message: '删除失败',
      };
    }
  }
}

export default new TodoController();