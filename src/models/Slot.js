const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    doctor_id: {
        type: Number,
        required: true,
    },
    slot: {
        type: Number,
        required: true
    }
});

const Slot = mongoose.model("Slot", SlotSchema);

module.exports = Slot;