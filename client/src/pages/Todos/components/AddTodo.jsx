import { useState } from "react";

function AddTodo({ onAdd }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  const handleOnAdd = () => {
    if (value) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <div className="todo-add">
      <input type="text" name="title" value={value} onChange={handleChange} />
      <button type="button" onClick={handleOnAdd}>
        Add
      </button>
    </div>
  );
}

export default AddTodo;
