const router = require("express").Router();
const task = require("../models/task");
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

//create-tasks
router.post("/create-task", authenticateToken, async(req,res)=>{
    try {
        const {title,desc} = req.body;
        const {id} = req.headers;
        const newTask = new Task({ title: title, desc: desc});
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, { $push: {tasks:taskId._id} } );
        res.status(200).json({message:"Task created"});
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//get-all-tasks
router.get("/get-all-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({ 
            path: "tasks" , 
            options: { sort: { createdAt: -1} },
        });
        res.status(200).json({ data: userData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//delete tasks
router.delete("/delete-task/:id", authenticateToken, async(req,res)=>{
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, {$pull: {tasks: id} });
        res.status(200).json({ message : "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//upadate-task
router.put("/update-task/:id", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,desc} = req.body;
        await Task.findByIdAndUpdate(id,{title: title, desc: desc});
        res.status(200).json({ message : "Task updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//update-Important-task
router.put("/update-important-task/:id", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const impTask = TaskData.important;
        await Task.findByIdAndUpdate(id,{important: !impTask});
        res.status(200).json({ message : "Task updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//update-Complete-task
router.put("/update-complete-task/:id", authenticateToken, async(req,res)=>{
    
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const compTask = TaskData.complete;
        await Task.findByIdAndUpdate(id,{ complete: !compTask });
        res.status(200).json({ message : "Task updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//get-important-tasks
router.get("/get-important-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({ 
            path: "tasks" , 
            match: { important : true},
            options: { sort: { createdAt: -1} },
        });
        const impTaskData = Data.tasks;
        res.status(200).json({ data: impTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//get-complete-task
router.get("/get-complete-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({ 
            path: "tasks" , 
            match: { complete : true},
            options: { sort: { createdAt: -1} },
        });
        const compTaskData = Data.tasks;
        res.status(200).json({ data: compTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});

//get-incomplete-task
router.get("/get-incomplete-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({ 
            path: "tasks" , 
            match: { complete : false},
            options: { sort: { createdAt: -1} },
        });
        const compTaskData = Data.tasks;
        res.status(200).json({ data: compTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Internal Server Error"});
    }
});
module.exports = router;
