const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    //verificar token
    const token = req.get('Authorization');
    console.log('this is token', token);

    if(!token) {
        res.status(401).json({ message: 'Request without token' });
    }

    //validar token
    const tokenWithoutBearer = token.split(' ')[1];
    console.log('token without', tokenWithoutBearer);

    try {
        const decodedToken = jwt.verify(
            tokenWithoutBearer,
            process.env.SECRET_JWT
        );
        console.log('this is decoded token', decodedToken);
        
        req.user = { ...decodedToken };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error});
    }
}

module.exports = auth;