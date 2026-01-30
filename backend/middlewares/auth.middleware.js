import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// Development mode flag
const DEV_MODE = process.env.NODE_ENV !== 'production';

export const protect = (req, res, next) => {
    try {
        // Skip authentication in development mode
        if (DEV_MODE) {
            // Add mock user for development with valid ObjectId
            req.user = {
                userId: new ObjectId('507f1f77bcf86cd799439011'), // Valid ObjectId
                role: 'vendor' // Changed to 'vendor' for testing vendor functionality
            };
            return next();
        }

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // 4️⃣ Attach user to request
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };


        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, invalid token"
        });
    }
};
