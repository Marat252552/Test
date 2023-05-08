const express = require('express')


const GetSlotsRouter = () => {
    const router = express.Router()
    router.post('/')
    return router
}

module.exports = GetSlotsRouter