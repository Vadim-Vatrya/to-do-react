import React, { Component } from "react";
import TodoList from "./Component/TodoList/TodoList";
import initialTodos from "./todos.json";

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  toggleCompleted = (todoId) => {
    this.prevState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.complited,
          };
        }
        return todo;
      }),
    }));
  };

  render() {
    const { todos } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCounts = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0
    );

    return (
      <>
        <h1>Состояние компонента</h1>
        <div>
          <p>Общее количество: {totalTodoCount} </p>
          <p>Количество выполненых: {completedTodoCounts} </p>
        </div>
        <TodoList 
        todos={todos} 
        onDeleteTodo={this.deleteTodo}
        onToggleComplited={this.toggleCompleted}  />
      </>
    );
  }
}

export default App;
