import React, { Component } from "react";
// import shortid from 'shortid';

import TodoEditor from "./Component/TodoEditor";
import Container from "./Component/Container";
import TodoList from "./Component/TodoList";
import initialTodos from "./todos.json";
import shortid from "shortid";

class App extends Component {
  state = {
    todos: initialTodos,
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  toggleCompleted = (todoId) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  // toggleCompleted = todoId => {
  //   this.setState(prevState => ({
  //     todos: prevState.todos.map(todo => {
  //       if (todo.id === todoId) {
  //         return {
  //           ...todo,
  //           completed: !todo.completed,
  //         };
  //       }

  //       return todo;
  //     }),
  //   }));
  // };

  render() {
    const { todos } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCounts = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    return (
      <Container>
        <h1>Состояние компонента</h1>

        <TodoEditor onSubmit={this.addTodo} />

        <div>
          <p>Общее количество: {totalTodoCount} </p>
          <p>Количество выполненых: {completedTodoCounts} </p>
        </div>

        <TodoList
          todos={todos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
