import { types, flow } from 'mobx-state-tree';

import request from '../api/index';

// const doSomething = () => {
//   return new Promise(resolve=>{
//     setTimeout(function(){
//       let res = Array(3).fill({ value: 'Get Coffee' });
//       resolve(res);
//     },2000);
//   });
// }

// 获取Todo列表
const getTodoList = () => {
  return request.get!('/todo/list', {});
};

// 新增Todo
const addTodo = (data: object) => {
  return request.post!('/todo/add', data);
};

// 编辑Todo
const editTodo = (data: object) => {
  return request.post!('/todo/edit', data);
};

// 删除Todo
const delTodo = (data: object) => {
  return request.post!('/todo/del', data);
};

// 编辑Todo的Tag
const editTag = (data: object) => {
  return request.post!('/todo/editTag', data);
};

const Tag = types.model({
  id: types.optional(types.number, () => Math.random()),
  name: types.string,
});

const Todo = types
  .model('Todo', {
    id: types.optional(types.number, () => Math.random()),
    name: types.string,
    del: types.boolean,
    tags: types.array(Tag),
    isEditTag: false,
  })
  .actions((self) => (
    {
      // 点击编辑标签
      clickEditTag() {
        self.isEditTag = !self.isEditTag;
      },
      // 编辑标签
      editTag: flow(function* (tags: number[]) {
        console.log(tags)
        try {
          const params = {
            id: self.id,
            tags,
          };
          console.log(params)
          let res = yield editTag(params);
          console.log('编辑标签完毕', res)
        } catch (error) {
          console.error('编辑标签错误', error)
        }
      }),
      // 编辑Todo
      editTodo: flow(function* (inputValue: string) {
        try {
          const params = {
            id: self.id,
            name: inputValue,
          };
          let res = yield editTodo(params);
          console.log('编辑完毕', res)
        } catch (error) {
          console.error('编辑错误', error)
        }
      }),
      // 删除Todo
      delTodo: flow(function* () {
        try {
          const params = {
            id: self.id,
          };
          let res = yield delTodo(params);
          console.log('删除完毕', res)
        } catch (error) {
          console.error('删除错误', error)
        }
      }),
    }
  ))

const TodoStore = types
  .model('TodoStore', {
    todos: types.array(Todo),
  })
  .actions((self) => (
    {
      getData: flow(function* () {
        try {
          let res = yield getTodoList();
          console.log('请求完毕', res)
          self.todos = (res.data.list || []);
        } catch (error) {
          console.error('请求错误', error)
        }
      }),
      addTodo: flow(function* (value: string) {
        // self.todos.push({ name: value })
        try {
          const params = {
            name: value,
          };
          let res = yield addTodo(params);
          (self as any).getData();
          console.log('新增完毕', res)
        } catch (error) {
          console.error('新增错误', error)
        }
      }),
      afterCreate() {
       (self as any).getData();
      },
    }
  ))

export {
  Todo,
  TodoStore,
}; 