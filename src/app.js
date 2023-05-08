const express = require('express')
const GetUsersRouter = require('./routes/users/router')
const GetDoctorsRouter = require('./routes/doctors/router')

const app = express()

const UsersRouter = GetUsersRouter()
const DoctorsRouter = GetDoctorsRouter()

app.use(express.json())
app.use('/users', UsersRouter)
app.use('/doctors', DoctorsRouter)

module.exports = app