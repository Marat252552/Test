const User = require("../../models/User")
const {v4} = require("uuid")

class UsersController {
    async create(req, res) {
        try {
            let {name, age, phone} = req.body
            let user = new User({
                age,
                name,
                phone
            })
            await user.save()
            res.sendStatus(201).end()
        } catch(e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
}

module.exports = new UsersController()