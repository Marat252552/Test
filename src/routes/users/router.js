const express = require('express')
const UsersController = require('./controller')

const GetDoctorsRouter = () => {
    let router = express.Router()
    router.post('/', UsersController.create)
    router.get('/:id', UsersController.getOne)
    router.get('/', UsersController.getAll)
    return router
}

module.exports = GetDoctorsRouter