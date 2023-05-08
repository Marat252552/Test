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
        // default: ['']
    }
})

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;