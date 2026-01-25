import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
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
