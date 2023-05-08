const Doctor = require("../../models/Doctor")


class DoctorsController {
    // Создать врача
    async create(req, res) {
        try {
            const { name, spec } = req.body
            let doctor = new Doctor({
                name,
                spec
            })
            doctor.save()
            res.status(201).json(doctor).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(200).end()
        }
    }
    // Получить одного врача
    async getOne(req, res) {
        try {
            const doctor_id = req.params.id
            let response = await Doctor.findById(doctor_id)
            res.status(200).json({response}).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(200).end()
        }
    }
    // Получить всех врачей
    async getAll(req, res) {
        try {
            let response = await Doctor.find()
            res.status(200).json({response}).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(200).end()
        }
    }
    // Создать свободное место для будущей записи
    async addFreeSlot(req, res) {
        try {
            const { doctor_id, slot } = req.body
            // Если врач не найден, то вылетит ошибка
            let filter = {_id: doctor_id}
            let update = { $push: {slots: slot}}
            await Doctor.findOneAndUpdate(filter, update)
            let doctor = await Doctor.findOne(filter)
            res.status(201).json({doctor}).end()
        } catch (e) {
            console.log(e)
            res.status(500).send('Врач не найден').end()
        }
    }
}

module.exports = new DoctorsController()