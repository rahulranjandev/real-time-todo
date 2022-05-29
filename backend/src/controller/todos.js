import { request, response } from "express";

import Todo from "../model/todos.js";

/**
 * @param {request} req req1
 * @param {response} res
 */
const list = async (req, res) => {
  try {
    const rahul = await Todo.find();

    const total = await Todo.estimatedDocumentCount();

    res.json({
      status: "list",
      total,
      data: rahul,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
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

  const newTodo = await Todo.create({
    title,
    isCompleted,
  });

  res.json({
    staus: "create",
    body: newTodo,
  });
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
      res.json({
        status: true,
        data: Todo,
      });
    } else {
      res.json({
        status: false,
        data: null,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * @param {request} req
 * @param {response} res
 */
const updateById = async (req, res) => {
  try {
    const id = req.params.id;

    const body = req.body;

    const Todo = await Todo.findById(id);

    if (Todo) {
      Todo.title = body.title;
      Todo.isCompleted = body.isCompleted;

      const updatedTodo = await Todo.save();

      res.json({
        status: true,
        data: updatedTodo,
      });
    } else {
      res.json({
        status: false,
        data: null,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * @param {request} req req1
 * @param {response} res
 */
const deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const Todo = await Todo.findById(id);

    if (Todo) {
      const removedTodo = await Todo.remove();

      res.json({
        status: true,
        data: null,
        message: "Todo deleted",
      });
    } else {
      res.json({
        status: false,
        data: null,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

export default { list, create, getById, updateById, deleteById };
