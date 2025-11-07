const jwt = require('jsonwebtoken');

const sendTokenCookie = (res, userId) => {
    if(!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in .env file');
    }

    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true, 
        secure: isProduction,
        sameSite: isProduction ? 'None' : 'Lax',         
        maxAge: 24 * 60 * 60 * 1000, 
    });
}

module.exports = {
    sendTokenCookie
}