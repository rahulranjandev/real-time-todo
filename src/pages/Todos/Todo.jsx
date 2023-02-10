import React from 'react';
import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { Container, Segment, Divider, Header, Button } from 'semantic-ui-react';

import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const host = process.env.REACT_APP_SOCKET_HOST;

const socket = io(host);

function Todo() {
  const [state, setState] = useState([]);

  const prevTodos = useRef([]);

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.emit('todo:list');

    socket.on('todo:list', (data) => {
      setState(data);
      prevTodos.current = data;
    });

    socket.on('todo:created', (todo) => {
      const data = [...prevTodos.current, todo];
      setState(data);
      prevTodos.current = data;
    });

    socket.on('todo:updated', (todo) => {
      const newState = prevTodos.current.map((e) => {
        if (e.id === todo.id) {
          return todo;
        }
        return e;
      });

      setState(newState);
      prevTodos.current = newState;
    });

    socket.on('todo:deleted', (id) => {
      const newState = prevTodos.current.filter((e) => e.id !== id);
      setState(newState);
      prevTodos.current = newState;
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('todo:list');
      socket.off('todo:created');
      socket.off('todo:updated');
      socket.off('todo:deleted');
      socket.disconnect();
    };
  }, []);

  const getLatestTodos = () => {
    socket.emit('todo:list');
  };

  const onAdd = (name) => {
    const payload = {
      title: name,
      isCompleted: false,
    };

    socket.emit('todo:create', payload);
    // socket.emit("todo:list");

    // const data = [...prevTodos.current, payload];
    // setState(data);
    // prevTodos.current = data;
  };

  const onCompleted = (e, id) => {
    const val = e.target.checked;

    const itemList = state.map((e) => {
      if (e.id === id) {
        const updateTodoTemp = {
          ...e,
          isCompleted: val,
        };

        socket.emit('todo:update', updateTodoTemp);

        return updateTodoTemp;
      } else {
        return e;
      }
    });

    setState(itemList);
    prevTodos.current = itemList;
  };

  const onDelete = (id) => {
    const itemList = state.filter((e) => e.id !== id);
    socket.emit('todo:delete', id);
    setState(itemList);
    prevTodos.current = itemList;
  };

  return (
    <div className="todo-app">
      <div className="header">
        <Container fluid textAlign="center">
          <Header as="h1" block>
            Real Time Todo App
          </Header>
        </Container>
      </div>
      <div className="content">
        <Segment basic textAlign="center">
          <Header as="h3">Connected : {'' + isConnected}</Header>
          <Button>
            <a href="/banners">Upload Image</a>
          </Button>
          <Button onClick={getLatestTodos}>Get Latest Todos</Button>
          <AddTodo onAdd={onAdd} />
          <Divider horizontal>Todo List</Divider>
          <TodoList data={state} onCompleted={onCompleted} onDelete={onDelete} />
        </Segment>
      </div>
    </div>
  );
}

export default Todo;
