const express = require('express')
const GetUsersRouter = require('./routes/users/router')
const GetDoctorsRouter = require('./routes/doctors/router')
const GetSlotsRouter = require('./routes/slots/router')
const Slot = require('./models/Slot')
const { format } = require('date-fns') ;
const CheckSlots = require('./slotChecker')



const app = express()

const UsersRouter = GetUsersRouter()
const DoctorsRouter = GetDoctorsRouter()
const SlotsRouter = GetSlotsRouter()

app.use(express.json())
app.use('/users', UsersRouter)
app.use('/doctors', DoctorsRouter)
app.use('/slots', SlotsRouter)

CheckSlots()


module.exports = app

