import { Context } from 'koa';
import { AppDataSource } from "../data-source";
import { Todo, Tag } from "../entity/Todo";

class TagController {
  // 查询列表
  async list(ctx: Context) {
    const tagRepository = AppDataSource.getRepository(Tag);
    const findTagList = await tagRepository.find({
      where: {
        del: false,
      },
    });

    ctx.body = {
      status: 'SUCCESS',
      data: {
        list: findTagList,
      },
    };
  }
}

export default new TagController();