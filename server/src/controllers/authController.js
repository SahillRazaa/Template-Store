const { User } = require('../../models/user');
const { hashPassword } = require('../services/password');
const { sendTokenCookie } = require('../utils/token');

const registerUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if(!name || !email || !password || !confirmPassword) {
            res.status(400).json({success: false, message: "Please provide all details!"});
        }

        if(password !== confirmPassword) {
            res.status(400).json({success: false, message: "Passwords does not match!"});
        }

        if(password.length < 8) {
            res.status(400).json({success: false, message: "Passwords must be atleast 8 characters!"});
        }

        const userExits = await User.findOne({
            where: {
                email
            }
        });

        if(userExits) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        sendTokenCookie(res, newUser.id);

        res.status(201).json({
            success: false,
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        })

    } 
    catch(error) {
        console.error('Error in user registration:', error);
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        if(password.length < 8) {
            res.status(400).json({success: false, message: "Passwords must be atleast 8 characters!"});
        }

        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        sendTokenCookie(res, user.id);

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error in user login:', error);
        next(error);
    }
};

const logoutUser = (req, res, next) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}