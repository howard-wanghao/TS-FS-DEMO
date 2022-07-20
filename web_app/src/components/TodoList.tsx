import React from 'react';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

import './TodoList.css';

import { Todo } from './Todo';
import { TodoStore } from '../mst/store';
import request from '../api/index';

interface ITag {
  id: number;
  name: string;
  todos?: any[];
}

class TodoList extends React.Component<any, any> {
  newTodoValue: string;
  tagList: ITag[];
  store: any;

  constructor(props: any) {
    super(props);

    makeObservable(this, {
      newTodoValue: observable,
      tagList: observable,
    });
    this.newTodoValue = '';
    this.tagList = [];
  }

  componentDidMount() {
    this.store = TodoStore.create({ todos: [] })
    // async actions will always return a promise resolving to the returned value
    // this.store.getData().then(() => {
    //   console.log("done")
    // })

    // 获取标签
    this.getTagList();
  }

  render() {
    return (
      <div className="TodoList">
        <input value={this.newTodoValue} onChange={this.handleChange}/>
        <button onClick={this.handleNewTodoClick}>新增</button>
        <div className="TodoList-main">
          {/* todo列表 */}
          {this.store ? this.store.todos.map((todo: any) => 
            <Todo todo={todo} tagList={this.tagList} getTodoList={() => this.getTodoList()} key={todo.id}/>
          ) : null}
          {/* 占位 */}
          <div style={{ padding: '2vmin', margin: '2vmin' }} />
        </div>
      </div>
    )
  }

  // 新增输入框回调
  handleChange = (e: any) => {
    this.newTodoValue = e.target.value;
  };

  // 新增
  handleNewTodoClick = (e: any) => {
    e.stopPropagation();

    this.store.addTodo(this.newTodoValue);
    this.newTodoValue = '';
  };

  // 获取tag列表
  getTagList = () => {
    request.get!('/tag/list', {}).then((res) => {
      this.tagList = res.data.list;
    }).catch((err) => {
      console.log(err.message);
    });
  };

  // 刷新todo列表
  getTodoList = () => {
    this.store.getData();
  }
}

export default observer(TodoList);