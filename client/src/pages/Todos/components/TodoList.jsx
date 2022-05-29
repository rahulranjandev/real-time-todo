import TodoItem from "./TodoItem";

function TodoList({ data, onCompleted, onDelete }) {
  return (
    <div className="todo-list">
      {data.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCompleted={onCompleted}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
