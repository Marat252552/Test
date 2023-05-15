const Doctor = require("../../models/Doctor")
const Slot = require("../../models/Slot")

const MakeSlots = () => {
    // Создает слоты на сегодняшний день
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let MM_DD_YYYY = `${month} ${day} ${year}`
    let slots = []
    // 4 слота от 09:00:00 до 18:00:00
    for(let i = 1; i < 5; i++) {
        slots.push(`${MM_DD_YYYY} ${6+(i*3)}:00:00 GMT+3`)
    }
    return slots
}

class DoctorsController {
    // Создать врача
    async create(req, res) {
        try {
            const { name, spec } = req.body
            if (!name || !spec) {
                return res.status(400).send('Заполнены не все поля').end()
            }
            let slots = MakeSlots()
            let doctor = new Doctor({
                name,
                spec,
                slots
            })
            doctor.save()
            res.status(201).json({message: 'Врач успешно создан', doctor}).end()
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
            if(!response) {
                return res.status(400).send('Врач не найден').end()
            }
            res.status(200).json({ response }).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
    // Получить всех врачей
    async getAll(req, res) {
        try {
            let response = await Doctor.find()
            res.status(200).json({ response }).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
    // Создать свободное место для будущей записи
    async addFreeSlot(req, res) {
        try {
            const { doctor_id, slot } = req.body
            let date = Date.parse(slot)
            if(!date) {
                return res.status(400).send('Указан неверный формат даты')
            }
            let filter = { _id: doctor_id }
            let update = { $push: { slots: slot } }
            // Проверка, есть ли врач с указанным _id
            let doctor_sql_res = await Doctor.findOne(filter)
            if(!doctor_sql_res) {
                return res.status(400).send('Врач не найден').end()
            }
            // Проверка, есть ли уже свободное место у врача с этим временем
            let doesFreeSlotExist = doctor_sql_res.slots.find(el => el === slot)
            if(doesFreeSlotExist) {
                return res.status(400).send('Это свободное место уже имеется у данного врача').end()
            }
            // Проверка, записан ли кто-то уже к этому врачу на указанное время
            let doesSlotExist = await Slot.findOne({date: slot})
            if(doesSlotExist) {
                return res.status(400).send('Кто-то уже записан на это время к указанному врачу')
            }
            // Непосредственно добавление свободной записи врачу
            await Doctor.findOneAndUpdate(filter, update)
            let doctor = await Doctor.findOne(filter)
            res.status(201).json({ message: 'Свободное место успешно добавлено', doctor }).end()
        } catch (e) {
            console.log(e)
            res.status(500).send('Произошла непредвиденная ошибка').end()
        }
    }
}

module.exports = new DoctorsController()