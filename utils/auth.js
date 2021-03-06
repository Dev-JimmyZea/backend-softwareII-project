const jwt = require('jsonwebtoken');

module.exports = {
    getDataToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'SECRET', (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

    },
    verifyToken: (req, res, next)=>{
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({
                auth: false,
                message: 'No token provided.'
            });
        }
        jwt.verify(token, 'SECRET', (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate token.'
                });
            }
            req.decoded = decoded;
            next();
        });

    } 
}

