// Middleware to check if the user is an admin
export const adminAuthMiddleware = async (req, res, next) => {
    if (!req.user.admin) return res.status(403).json({ message: 'Access denied. Not an admin.' });
    next();
};
