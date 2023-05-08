const express = require('express')
const UsersController = require('./controller')

const GetDoctorsRouter = () => {
    let router = express.Router()
    router.post('/', UsersController.create)
    return router
}

module.exports = GetDoctorsRouter