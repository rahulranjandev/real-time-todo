import { request, response } from 'express';
import Todo from '../model/todos.js';

/**
 * @param {request} req req1
 * @param {response} res
 */
const list = async (req, res) => {
  try {
    const rahul = await Todo.find();

    const total = await Todo.estimatedDocumentCount();

    res.json({
      status: 'list',
      total,
      data: rahul,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }

  // Todo.find().then((data1) => {
  //   res.json({
  //     staus: "list",
  //     data: data1,
  //   });
  // });
};

/**
 * @param {request} req req1
 * @param {response} res
 */
const create = async (req, res) => {
  // const newRahul

  const body = req.body;

  const { title, isCompleted } = body;

  try {
    const newTodo = await Todo.create({
      title,
      isCompleted,
    });

    res.status(201).json({
      staus: 'create',
      data: newTodo,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }
};

/**
 * @param {request} req
 * @param {response} res
 */
const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const Todo = await Todo.findById(id);

    if (Todo) {
      res.status(200).json({
        status: true,
        data: Todo,
      });
    } else {
      res.status(404).json({
        status: false,
        data: null,
        message: 'Todo not found',
      });
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }
};

/**
 * @param {request} req
 * @param {response} res
 */
const updateById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const Todo = await Todo.findById(id);

    if (Todo) {
      Todo.title = body.title;
      Todo.isCompleted = body.isCompleted;

      const updatedTodo = await Todo.save();

      res.status(200).json({
        status: true,
        data: updatedTodo,
      });
    } else {
      res.status(404).json({
        status: false,
        data: null,
        message: 'Todo not found',
      });
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }
};

/**
 * @param {request} req req1
 * @param {response} res
 */
const deleteById = async (req, res) => {
  const id = req.params.id;

  try {
    const Todo = await Todo.findById(id);

    if (Todo) {
      const removedTodo = await Todo.remove();

      res.status(200).json({
        status: true,
        message: 'Todo deleted',
      });
    } else {
      res.status(404).json({
        status: false,
        data: null,
        message: 'Todo not found',
      });
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }
};

export default { list, create, getById, updateById, deleteById };
