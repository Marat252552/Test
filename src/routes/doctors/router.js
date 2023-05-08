const express = require('express')
const DoctorsController = require('./controller')

const GetDoctorsRouter = () => {
    let router = express.Router()
    router.post('/', DoctorsController.create)
    router.post('/addfreeslot', DoctorsController.addFreeSlot)
    router.get('/:id', DoctorsController.getOne)
    router.get('/', DoctorsController.getAll)
    return router
}

module.exports = GetDoctorsRouter