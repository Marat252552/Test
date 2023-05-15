const express = require('express')
const SlotsController = require('./controller')

const GetSlotsRouter = () => {
    const router = express.Router()
    router.post('/', SlotsController.take)
    router.get('/', SlotsController.get)
    return router
}

module.exports = GetSlotsRouter