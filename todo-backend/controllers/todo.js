const express = require('express')
const router = express.Router()
const Todo  = require('../models/Todo')


// CRUD

// Read
router.get('/', (req, res) => {
    Todo.find({}, (err, foundTodos) => {
    if (!err) {
      res.status(200).json(foundTodos)
    } else {
      res.status(400).send(err)
    }
  })
})

router.get('/table', (req, res) => {
 
    Todo.find({}, (err, foundTodos) => {
    if (!err) {
        const formattedData = foundTodos.reduce((acc, item) => {
          acc[item.status] = acc[item.status] ? [...acc[item.status], item] : [item]
          return acc
        }, {})
        res.status(200).json(formattedData)
    } else {
      res.status(400).json(err)
    }
  })
})




// Create
router.post('/', (req, res) => {
  const { body } = req

  Todo.create(body, (err, createdTodo) => {
    if (!err){
      res.status(200).json({message: "All Good!", createdTodo: createdTodo})
    } else {
      res.status(400).send(err)
    }
  })
})

// Update
router.put('/:id', (req, res) => {
  const { body } = req
  Todo.findByIdAndUpdate(req.params.id, body, {new: true}  ,(err, updatedTodo) => {
    if(!err){
      res.status(200).json(updatedTodo)
    } else {
      res.status(400).send(err)
    }
  })
})


//Delete
router.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err) => {
    if(!err) {
      res.status(200).send({message: "Deleted that task yessirr"})
    } else {
      res.status(400).send(err)
    }
  })
})


router.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, foundTodo) => {
    if (!err) {
      res.status(200).json(foundTodo)
    } else {
      res.status(400).send(err)
    }
  })
})








module.exports = router