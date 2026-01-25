export const authorizeRoles = (req, res, next)=>{
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (req.user.role!=='vendor') {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You don't have permission"
            });
        }


        next();
    };

