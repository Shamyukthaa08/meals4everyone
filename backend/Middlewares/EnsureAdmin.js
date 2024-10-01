const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();  // If the user is an admin, proceed to the next middleware or route handler
    } else {
        return res.status(403).json({ message: 'Forbidden, Admin access only' });
    }
};

module.exports = ensureAdmin;
