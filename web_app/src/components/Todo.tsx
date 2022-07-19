import React, { useState } from 'react';
import { observer } from 'mobx-react';

import './Todo.css';

interface IProps {
  id: number,
  value: string,
  tags: Array<number>,
  isEdit: boolean,
  isEditTag: boolean,
  editTodo: Function,
  delTodo: Function,
}

export const Todo = observer(({ todo }: { todo: IProps }) => {
  const [ inputValue, setInputValue ] = useState(todo.value);
  const onEditChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="Todo">
      <div className="Todo-item" style={{ width: '10%' }}>ID: {todo.id}</div>
      <div className="Todo-item" style={{ width: '30%' }}>
        <span>任务: </span>
        <input value={inputValue} onChange={onEditChange}/>
      </div>
      <button onClick={(e) => todo.editTodo(inputValue)}>编辑任务</button>
      {/* 标签 */}
      <div className="Todo-tag">
        <span>标签: </span>
      </div>
      <button style={{ float: 'right' }} onClick={(e) => todo.delTodo()}>删除任务</button>
    </div>
  );
});