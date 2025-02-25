import mongoose from "mongoose";

const tracneSchema = new mongoose.Schema({
    
    foodIntake: {
        type: String,
        required: true // Optional field to log what the user ate
    },

    skincareProducts: {
        type: [String], // Array to store multiple products
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
        type: String, // URL of uploaded image
        required: false
    }
}, { timestamps: true });

const Tracne = mongoose.model('Tracne', tracneSchema);

export default Tracne;
