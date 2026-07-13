const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    //extract jwt token from the request header

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'unauthorized' });

    try {
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach the user information to the request object

        req.user = decoded
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'invalid token' });
    }
}

//Funstion for token generation

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = { jwtAuthMiddleware, generateToken }