import React, { Component } from "react";
import shortid from "shortid";

import Filter from "./Component/Filter";
import TodoEditor from "./Component/TodoEditor";
import Container from "./Component/Container";
import TodoList from "./Component/TodoList";
import Modal from "./Component/Modal";
import initialTodos from "./todos.json";
import IconButton from "./Component/IconButton";
import { ReactComponent as AddIcon } from "./icons/add.svg";

class App extends Component {
  state = {
    todos: initialTodos,
    filter: "",
    showModal: false,
  };

  componentDidMount = () => {
    const todos = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  };

  componentDidUpdate = (prevState, prevProps) => {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }

    // if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
    //   this.toggleModal();
    // }
  };

  addTodo = (text) => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));

    // this.toggleModal();
  };

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  toggleCompleted = (todoId) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCounts = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>

        {showModal && (
          <Modal>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}

        <div>
          <p>Общее количество: {totalTodoCount} </p>
          <p>Количество выполненых: {completedTodoCounts} </p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
