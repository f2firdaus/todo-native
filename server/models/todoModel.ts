import mongoose, { model, Schema } from "mongoose";
interface Todo{
    todo: string,
    dates: string;
  completed: boolean;
  todoDates: string;
}
const todoSchema = new Schema<Todo>({
  todo: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
  },
  
  completed: {
    type: Boolean,
  },
});
const TodoSchemas = model<Todo>("Todos", todoSchema);
export default TodoSchemas;
