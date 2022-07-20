import TodoController from '../controller/todo';

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
];