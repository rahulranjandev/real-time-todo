import { useState } from 'react';

import { Grid, Button, Input, Form } from 'semantic-ui-react';

function AddTodo({ onAdd }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  const handleOnAdd = () => {
    if (value) {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <div className="todo-add">
      <br />
      <Grid textAlign="center">
        <Grid.Row>
          <Form className="todo-add-form">
            <Form.Group>
              <Form.Field
                inline
                focus
                control={Input}
                type="text"
                placeholder="Enter Todo"
                value={value}
                onChange={handleChange}
              />
              <Form.Field inline color="green" control={Button} type="button" content="Add" onClick={handleOnAdd} />
            </Form.Group>
          </Form>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default AddTodo;
