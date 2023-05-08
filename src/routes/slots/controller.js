const Slot = require("../../models/Slot")



class SlotsController {
    // Добавление места свободной записи врачу
    async create(req, res) {
        try {
            let {slot, doctor_id} = req.body
            
        } catch(e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
}

module.exports = SlotsController