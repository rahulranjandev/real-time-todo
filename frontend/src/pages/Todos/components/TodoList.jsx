import TodoItem from './TodoItem';

import { Grid } from 'semantic-ui-react';

function TodoList({ data, onCompleted, onDelete }) {
  return (
    <div className="todo-list">
      <div className="box">
        <Grid textAlign="center">
          {data.map((todo) => (
            <Grid.Row textAlign="center" key={todo.id}>
              <TodoItem todo={todo} onCompleted={onCompleted} onDelete={onDelete} />
            </Grid.Row>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default TodoList;
