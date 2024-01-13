import userModels from "../models/User.js";
import jwt from 'jsonwebtoken';


const cheakUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {

            const token = authorization.split(' ')[1];

            // verify token 
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // get user from token
            req.user = await userModels.findById(userId).select('-password');
            next()



        } catch (error) {
            res.send({ "status": "failed", "message": "Unauthorised user" })

        }

    }

    if (!token) {
        res.send({ "status": "failed", "message": "No token unauthoreise user" })
    }

}

export default cheakUserAuth