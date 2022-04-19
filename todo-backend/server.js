require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const todoRouter = require('./controllers/todo')


app.use(cors())
app.use(express.json())
app.use("/todos", todoRouter)


// this is a dummy change


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})