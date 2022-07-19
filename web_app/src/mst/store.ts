import { types, flow } from 'mobx-state-tree';

const doSomething = () => {
  return new Promise(resolve=>{
    setTimeout(function(){
      let res = Array(3).fill({ value: 'Get Coffee' });
      resolve(res);
    },2000);
  });
}

const Todo = types
  .model('Todo', {
    id: types.optional(types.number, () => Math.random()),
    value: types.string,
    tags: types.optional(types.array(types.number), []),
    isEdit: false,
    isEditTag: false,
  })
  .actions((self) => (
    {
      // 点击编辑标签
      clickEditTag() {
        self.isEditTag = !self.isEditTag;
      },
      // 编辑Todo
      editTodo(inputValue: string) {
        self.value = inputValue;
        console.log('编辑完成:', self);
      },
      // 删除Todo
      delTodo() {
        console.log(`删除${self.id}`)
      },
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
          let res = yield doSomething();
          console.log('请求完毕', res)
          self.todos.push(...res)
          console.log('self.todos', self.todos)
        } catch (error) {
          console.error('请求错误', error)
        }
      }),
      addTodo(value: string) {
        self.todos.push({ value })
      }
    }
  ))

export {
  Todo,
  TodoStore,
}; 