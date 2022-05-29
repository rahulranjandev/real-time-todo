import { Router } from "express";

const router = Router();

import Todo from "../controller/todos.js";

router.route("/").get(Todo.list).post(Todo.create);

router
  .route("/:id")
  .get(Todo.getById)
  .put(Todo.updateById)
  .delete(Todo.deleteById);

export default router;
