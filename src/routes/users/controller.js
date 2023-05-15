const User = require("../../models/User")
const {v4} = require("uuid")

class UsersController {
    // Создать пользователя
    async create(req, res) {
        try {
            let {name, age, phone} = req.body
            if(!name || !age || !phone) {
                return res.status(400).send('Не все поля заполнены').end()
            }

            let user = new User({
                age: +age,
                name,
                phone: JSON.stringify(phone)
            })
            let response = await user.save()
            
            res.status(201).json({message: 'Пользователь успешно создан', response}).end()
        } catch(e) {
            console.log(e)
            res.status(500).send('Произошла непредвиденная ошибка').end()
        }
    }
    // Получить всех пользователей
    async getAll(req, res) {
        try {
            let { user_id } = req.query
            let filter =
                user_id ? {user_id} : {}
            let response = await User.find(filter)
            res.status(200).json({response}).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
    // Получить одного пользователя
    async getOne(req, res) {
        try {
            const user_id = req.params.id
            let response = await User.findById(user_id)
            if(!response) {
                return res.status(400).send('Пользователь не найден').end()
            }
            res.status(200).json({ response }).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
}

module.exports = new UsersController()