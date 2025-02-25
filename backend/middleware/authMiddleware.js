import jwt from "jsonwebtoken";
import User from "../models/tracne.user.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Get token from header
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
