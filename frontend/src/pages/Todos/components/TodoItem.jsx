import React from 'react';

import { Button, Form, Input } from 'semantic-ui-react';

function TodoItem({ todo, onCompleted, onDelete }) {
  if (todo.isCompleted) {
    return (
      <div className="todo-item">
        <Form className="todo-item-form">
          <Form.Group>
            <Form.Field
              inline
              control={Input}
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) => onCompleted(e, todo.id)}
            />
            <Form.Field inline type="text">
              <s className="todo-item-title">{todo.title}</s>
            </Form.Field>
            <Form.Field
              inline
              control={Button}
              size="mini"
              icon="trash"
              color="red"
              onClick={() => onDelete(todo.id)}
            />
          </Form.Group>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="todo-item">
        <Form className="todo-item-form">
          <Form.Group>
            <Form.Field
              inline
              control={Input}
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) => onCompleted(e, todo.id)}
            />
            <Form.Field inline type="text">
              <span>{todo.title}</span>
            </Form.Field>
            <Form.Field
              inline
              control={Button}
              size="mini"
              icon="trash"
              color="red"
              onClick={() => onDelete(todo.id)}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default TodoItem;
