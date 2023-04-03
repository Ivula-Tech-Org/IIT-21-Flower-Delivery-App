import jwt from 'jsonwebtoken'
import { logDate } from './globals.js';

const validation = async (req, res, next) => {
    let token;
    let authHead = req.headers.authorization
    token = jwt.verify(authHead, process.env.JWT_ENC_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ token: "Unauthorized request, kindly log in again" })
            console.log(`${logDate} | Authentication Service | Validation Service Response | status ${res.statusCode} : ${res.statusMessage} | jwt token expired`)
            
        } else {
            console.log(decoded)
            delete decoded.exp
            delete decoded.iat
            console.log(decoded)
            const newToken = jwt.sign(decoded, process.env.JWT_ENC_KEY, {expiresIn:"1m"})
            req.user = {token: newToken}
            // res.user({ userDetails: decoded, token:newToken })
            next()
        }
    })

}

export default validation;