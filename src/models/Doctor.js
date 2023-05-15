const mongoose = require("mongoose");



const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    spec: {
        type: String,
        required: true,
    },
    slots: {
        type: [String],
        default: [
            '10 05 2023 09:00:00 GMT+3',
            '10 05 2023 12:00:00 GMT+3',
            '10 05 2023 15:00:00 GMT+3',
            '10 05 2023 18:00:00 GMT+3'
        ]
    }
})

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;