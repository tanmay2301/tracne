import mongoose from "mongoose";

const tracneSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    foodIntake: {
        type: String,
        required: true
    },

    skincareProducts: {
        type: [String],
        required: true
    },

    acneCount: {
        type: Number,
        required: true
    },

    acneType: {
        type: String,
        enum: ["Blackheads", "Whiteheads", "Papules", "Pustules", "Nodules", "Cysts"],
        required: true
    },

    severity: {
        type: String,
        enum: ["Mild", "Moderate", "Severe"],
        required: true
    },

    notes: {
        type: String,
        required: false
    },

    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Tracne = mongoose.model('Tracne', tracneSchema);

export default Tracne;