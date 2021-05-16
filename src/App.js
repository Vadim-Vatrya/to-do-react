import React, { Component } from "react";
import TodoList from "./Component/TodoList";
import initialTodos from './todos.json';

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = (todoId) =>{
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }))
}

  render() {
    const { todos } = this.state;
    return (
      <>
        <h1>Состояние компонента</h1>
        <div>
          <span>Общее количество: {todos.length}</span>
          <span>Количество выполненых</span>
        </div>
      <TodoList todos = {todos} onDeleteTodo = { this.deleteTodo } />
      </>
    );
  }
}

export default App;
