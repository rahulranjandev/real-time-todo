import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
  {
    title: String,
    isCompleted: Boolean,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
