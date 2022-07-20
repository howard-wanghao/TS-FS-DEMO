import TodoController from '../controller/todo';
import TagController from '../controller/tag';

export interface RouteItem {
  path: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  action: any,
}

export const AppRoutes: RouteItem[] = [
  // 查询Todo列表
  {
    path: '/todo/list',
    method: 'get',
    action: TodoController.list,
  },
  // 新增Todo
  {
    path: '/todo/add',
    method: 'post',
    action: TodoController.add,
  },
  // 修改Todo
  {
    path: '/todo/edit',
    method: 'post',
    action: TodoController.edit,
  },
  // 删除Todo
  {
    path: '/todo/del',
    method: 'post',
    action: TodoController.del,
  },
  // 修改Todo的tag
  {
    path: '/todo/editTag',
    method: 'post',
    action: TodoController.editTag,
  },

  // 查询Tag列表
  {
    path: '/tag/list',
    method: 'get',
    action: TagController.list,
  },
];