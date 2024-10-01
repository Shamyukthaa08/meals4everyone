const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;  // Include role in request body
        const user = await UserModel.findOne({ email });
        
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, please login', success: false });
        }
        
        // Create a new user with the role (default to 'user' if not provided)
        const userModel = new UserModel({ name, email, password, role: role || 'user' });
        
        // Hash password before saving
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(403)
                .json({ message: 'Auth failed, email or password is wrong', success: false });
        }
        
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403)
                .json({ message: 'Auth failed, email or password is wrong', success: false });
        }
        
        // Include role in JWT payload
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role },  // Add role to token payload
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email,
                name: user.name,
                role: user.role  // Include role in response
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

module.exports = {
    signup,
    login
};
