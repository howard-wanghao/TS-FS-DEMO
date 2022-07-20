import React, { useState } from 'react';
import { observer } from 'mobx-react';

import './Todo.css';

interface ITodo {
  id: number,
  name: string,
  del: boolean,
  tags: Array<any>,
  isEditTag: boolean,
  editTodo: Function,
  delTodo: Function,
  clickEditTag: Function,
  editTag: Function,
}

interface ITag {
  id: number;
  name: string;
  todos?: any[];
}

export const Todo = observer(({ todo, tagList, getTodoList }: { todo: ITodo, tagList: ITag[], getTodoList: Function }) => {
  const [ inputValue, setInputValue ] = useState<string>(todo.name);
  const onEditChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const [ checkTags, setCheckTags ] = useState<Array<number>>([]);
  const onEditTagChange = (tag: any, changeChecked: boolean) => {
    if (changeChecked) {
      // 新增
      setCheckTags([ ...checkTags, tag.id  ]);
    } else {
      // 删除
      const findId = checkTags.findIndex(i => i === tag.id);
      let _CheckTags = [...checkTags];
      _CheckTags.splice(findId, 1);
      setCheckTags(_CheckTags);
    }
  };

  return (
    <div className="Todo">
      <div className="Todo-item" style={{ width: '10%' }}>ID: {todo.id}</div>
      <div className="Todo-item" style={{ width: '30%' }}>
        <span>任务: </span>
        <input value={inputValue} onChange={onEditChange}/>
      </div>
      <button onClick={(e) => {
        todo.editTodo(inputValue).then(() => {
          console.log('刷新列表');
          getTodoList();
        });
      }}>编辑任务</button>
      {/* 标签 */}
      {todo.isEditTag ? (
        // 编辑标签
        <div className="Todo-tag-edit" style={{ width: '35%' }}>
          {tagList.map((tag) => {
            const isChecked = !!checkTags.find(i => i === tag.id);
            return (
              <span key={tag.id} style={{ marginRight: '4px' }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => onEditTagChange(tag, !isChecked)}
                />
                {tag.name}
              </span>
            );
          })}
          <button style={{ marginRight: '2vmin' }} onClick={(e) => {
            todo.editTag(checkTags).then(() => {
              setCheckTags([]);
              console.log('刷新列表');
              getTodoList();
            });
          }}>确认修改</button>
        </div>
      ) : (
        // 展示标签
        <div className="Todo-tag" style={{ width: '30%' }}>
          <span>标签: </span>
          {todo.tags.map((tag) => {
            return (
              <span key={tag.id} style={{ marginRight: '4px', textDecoration: 'underline' }}>{tag.name}</span>
            );
          })}
        </div>
      )}
      {!todo.isEditTag ? (
        <button style={{ marginRight: '2vmin' }} onClick={(e) => {
          todo.clickEditTag();
          const getTags = todo.tags.map(t => t.id);
          setCheckTags(getTags);
        }}>编辑标签</button>
      ) : null}
      <button style={{ float: 'right' }} onClick={(e) => {
        todo.delTodo().then(() => {
          console.log('刷新列表');
          getTodoList();
        });
      }}>删除任务</button>
    </div>
  );
});