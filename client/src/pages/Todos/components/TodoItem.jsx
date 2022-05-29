function TodoItem({ todo, onCompleted, onDelete }) {
  if (todo.isCompleted) {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          className="mx-2"
          checked={todo.isCompleted}
          onChange={(e) => onCompleted(e, todo.id)}
        />
        <s>{todo.title}</s>
        <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
          X
        </button>
      </div>
    );
  } else {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          className="mx-2"
          checked={todo.isCompleted}
          onChange={(e) => onCompleted(e, todo.id)}
        />
        <span>{todo.title}</span>
        <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
          X
        </button>
      </div>
    );
  }
}

export default TodoItem;
