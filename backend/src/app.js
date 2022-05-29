import express from "express";

import dotenv from "dotenv";
import cors from "cors";

import morgan from "morgan";

import { Server } from "socket.io";
import { createServer } from "http";

import { connectDB } from "./db.js";

import routes from "./routes/index.js";

import Todo from "./model/todos.js";

dotenv.config();

export const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error("Azure Storage Connection string not found");
}

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI);

const app = express();

const httpServer = createServer(app);

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

const status = (req, res) => {
  res.json({
    status: true,
  });
};

app.get("/", status);

app.use("/", routes);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    withCredentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(`connect: ${socket.id}`);

  socket.on("todo:list", async () => {
    const todos = await Todo.find({});
    socket.emit("todo:list", todos);
  });

  socket.on("todo:create", async (todo) => {
    try {
      const newTodo = await Todo.create(todo);
      socket.broadcast.emit("todo:created", newTodo);
      socket.emit("todo:created", newTodo);
    } catch (err) {
      socket.emit("todo:create:error", err);
    }
  });

  socket.on("todo:read", async (id) => {
    try {
      const todo = await Todo.findById(id);
      socket.emit("todo:read", todo);
    } catch (err) {
      socket.emit("todo:read:error", err);
    }
  });

  socket.on("todo:update", async (todo) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(todo.id, todo, {
        new: true,
      });

      socket.broadcast.emit("todo:updated", updatedTodo);
    } catch (err) {
      socket.emit("todo:update:error", err);
    }
  });

  socket.on("todo:delete", async (id) => {
    try {
      console.log(`delete: ${id}`);
      const todo = await Todo.findByIdAndDelete(id);

      socket.broadcast.emit("todo:deleted", id);
    } catch (err) {
      socket.emit("todo:delete:error", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
