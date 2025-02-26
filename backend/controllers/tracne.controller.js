import Tracne from "../models/tracne.model.js";
import mongoose from 'mongoose';

// Get acne logs for the logged-in user
export const getAcneLogs = async (req, res) => {
    try {
        // Filter logs by the authenticated user's ID
        const acneLogs = await Tracne.find({ user: req.user._id });
        res.status(200).json({ success: true, data: acneLogs });
    } catch (error) {
        console.error("Error fetching acne logs:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Create a new acne log entry
export const createAcneLog = async (req, res) => {
    const acneLog = req.body;

    if (!acneLog.foodIntake || !acneLog.skincareProducts || !acneLog.acneCount || !acneLog.acneType || !acneLog.severity) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // Assign the current user's ID to the new log
    acneLog.user = req.user._id;
    
    const newAcneLog = new Tracne(acneLog);

    try {
        await newAcneLog.save();
        res.status(201).json({ success: true, data: newAcneLog });
    } catch (error) {
        console.error("Error creating acne log:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update an acne log entry
export const updateAcneLog = async (req, res) => {
    const { id } = req.params;
    const acneLog = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Log ID" });
    }

    try {
        // First check if the log belongs to the authenticated user
        const existingLog = await Tracne.findById(id);
        
        if (!existingLog) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }
        
        // Convert to string for comparison since ObjectId is an object
        if (existingLog.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this log" });
        }
        
        const updatedAcneLog = await Tracne.findByIdAndUpdate(id, acneLog, { new: true });
        res.status(200).json({ success: true, data: updatedAcneLog });
    } catch (error) {
        console.error("Error updating acne log:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete an acne log entry
export const deleteAcneLog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Log ID" });
    }

    try {
        // First check if the log belongs to the authenticated user
        const log = await Tracne.findById(id);
        
        if (!log) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }
        
        // Convert to string for comparison since ObjectId is an object
        if (log.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this log" });
        }
        
        await Tracne.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Acne log deleted" });
    } catch (error) {
        console.error("Error deleting acne log:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};