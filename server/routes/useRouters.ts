import express from 'express'
import TodoSchemas from '../models/todoModel';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index',{message:null})
})
router.post('/create-todo',async (req,res) => {
    try {
        // const {todo,dates,completed} =await req.body
        const newTodo = new TodoSchemas({
            todo:req.body.todo,
            dates: req.body.dates,
            completed:req.body.completed
        })
        await newTodo.save();
        res.render('index',{message:"Todo Created Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).render('index', { error: 'Error saving user data' });
    }
})


export default router