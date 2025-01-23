import express,{Express,Request,Response} from 'express'
import dotenv from 'dotenv'
import dbConnnect from '../config/db';
import cors from 'cors'
import router from '../routes/useRouters';
import TodoSchemas from '../models/todoModel';



dotenv.config();

dbConnnect();
const app: Express = express();
app.use(express.urlencoded({ extended: true }));
// const port = process.env.PORT


app.use(cors())

app.use(express.json())
app.get('/', async(req, res) => {
    try {
        const allTodo = await TodoSchemas.find({});
        // console.log(allTodo);
        res.status(200).json(allTodo)
    } catch (error) {
        res.status(404).json({error:error})
    }
})
app.post('/create-todo',async (req,res) => {
    try {
        const {todo,dates,completed,todoDates} =req.body
        const newTodo = new TodoSchemas({
            todo:todo,
            dates: dates,
            completed: completed,
            
        })
        await newTodo.save();
        
        res.status(201).json({message:"Todo Created Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error saving user data' });

    }
})
app.put('/update-task/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const updateTask = req.body;
        const todos = await TodoSchemas.findByIdAndUpdate(
            id,
            updateTask,
            {new:true}
            
        );
    //   console.log(todos)
        res.status(202).json({message:"Updated",todo:updateTask})
        
        
    } catch (error) {
        res.status(404).json({message:error})
    }
})
app.delete('/tododelete/:id', async (req, res) => {
    try {
        const { id } = req?.params;
        const deleteTodo = await TodoSchemas.findByIdAndDelete(
            id
        )
        res.status(204).json({message:"Delete Succfully"})
    } catch (error) {
        res.status(500).json({message:error})
    }
    
})
app.listen(process.env.PORT!, () => {
    console.log("Server running at port 4000")
})