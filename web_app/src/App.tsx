import React from 'react';
import logo from './logo.svg';
import './App.css';

import TodoList from './components/TodoList';

class App extends React.Component<any, any> {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {/* 一个 TodoList 组件 */}
        <TodoList />
      </div>
    );
  }
}

export default App;
