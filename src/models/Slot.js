const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    doctor_spec: {
        type: String,
        required: true 
    },
    doctor_id: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    day_reminded: {
        type: Boolean,
        default: false
    },
    two_hours_reminded: {
        type: Boolean,
        default: false
    }
});

const Slot = mongoose.model("Slot", SlotSchema);

module.exports = Slot;