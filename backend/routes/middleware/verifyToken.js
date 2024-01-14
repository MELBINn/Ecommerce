const jwt = require("jsonwebtoken")

// JWT middleware for authentication
const verifyToken = (req, res, next) => {
    // console.log("hii",req.headers.authorization)
    const authHeader = req.headers.authorization



    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECR, (err, user) => {    /* Decoding JWT token */
            if (err) res.status(403).json("Token is not valid!")
            req.user = user;
            next();
            // console.log("success");
        });
    } else {
        return res.status(401).json("You are not authenticated!")
    }
}

// Authentication and authorization
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id || req.user.isAdmin)    //=== req.params.id || req.user.isAdmin
        {
            // console.log("successs");
            next();
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

// Authentication and <admin-authorization>
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }