const Doctor = require("../../models/Doctor")
const Slot = require("../../models/Slot")
const User = require("../../models/User")


class SlotsController {
    // Записаться на прием (занять свободный слот у врача)
    async take(req, res) {
        try {
            let { date, doctor_id, user_id } = req.body
            if (!date || !doctor_id || !user_id) {
                return res.status(400).send('Заполнены не все поля').end()
            }
            if (!date) {
                return res.status(400).send('Указан неверный формат даты')
            }
            if (user_id.length !== 12 && user_id.length !== 24) {
                return res.status(400).send('Неверный формат user_id').end()
            }
            if (doctor_id.length !== 12 && doctor_id.length !== 24) {
                return res.status(400).send('Неверный формат doctor_id').end()
            }
            let user_sql_res = await User.findById(user_id)
            if (!user_sql_res) {
                return res.status(400).send('Данного пользователя нет').end()
            }
            let filter = { _id: doctor_id, slots: date }
            let update = { $pull: { slots: date } }
            let doctor_sql_res = await Doctor.findOneAndUpdate(filter, update)
            if (!doctor_sql_res) {
                return res.status(400).send('Данного врача нет или нет возможности записаться к нему в указанное время').end()
            }
            // Проверка, записан ли кто-то уже к этому врачу на указанное время
            let doesSlotExist = await Slot.findOne({ date })
            if (doesSlotExist) {
                return res.status(400).send('Кто-то уже записан на это время к указанному врачу')
            }
            let doctor_name = doctor_sql_res.name
            let doctor_spec = doctor_sql_res.spec
            let user_name = user_sql_res.name
            let slot = new Slot({
                doctor_id,
                date,
                doctor_name,
                doctor_spec,
                user_name,
                user_id
            })
            slot.save()
            res.status(201).send('Вы успешно записались на прием').end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
    // Получить все слоты по указанному пациенту и/или указанному врачу
    async get(req, res) {
        try {
            let { user_id, doctor_id } = req.query
            let filter =
                (user_id && doctor_id) ? { user_id, doctor_id } :
                    (user_id) ? { user_id } :
                        (doctor_id) ? { doctor_id } : {}
            let response = await Slot.find(filter)
            res.status(200).json({ response }).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
}

module.exports = new SlotsController()