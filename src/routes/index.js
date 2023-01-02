import { Router } from "express";

const router = Router();

import photostory from "./photostory.js";
import todo from "./todos.js";

router.use("/photostory", photostory);
router.use("/todos", todo);

export default router;
