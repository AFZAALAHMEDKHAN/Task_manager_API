const express = require('express')
const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req,res)=>{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
        //res.status(200).json({tasks,amount:tasks.length})
        //res.status(200).json({success: true,data:{tasks,amount:tasks.length}})
})



const createTask = asyncWrapper (async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json(task)
})

const getTaskbyId  =asyncWrapper( async (req,res,next)=>{
    const {id:taskId} = req.params
    const task = await Task.findOne({_id: taskId})
    if(!task) {
        return next(createCustomError(`No task with id: ${taskId}`,404))
    }
    res.status(200).json({task})
    })

const updateTask  = asyncWrapper(async (req,res)=>{
        const {id:taskId} = req.params

        const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true,
            runValidators:true
        })
        if(!task) {
        return next(createCustomError(`No task with id: ${taskId}`,404))
    }
    res.status(200).json({task})
})

const deleteTask  =asyncWrapper(async (req,res)=>{
        const {id:taskId} = req.params
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task) {
            return next(createCustomError(`No task with id: ${taskId}`,404))       
        }
        res.status(200).json({ task })
        //res.status(200).send()
        //res.status(200).json({ task: null,status:'success' })
        //this is to show, that anykind of response can be sent
})

module.exports = {getAllTasks,createTask,getTaskbyId,updateTask,deleteTask}