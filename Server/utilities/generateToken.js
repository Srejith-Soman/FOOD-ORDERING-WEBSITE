import jwt from 'jsonwebtoken'

const createToken = (id, role="user") =>{
    try {
        const token = jwt.sign({ id: id, role: role}, process.env.JWT_SECRET_KEY);
        return token;
    } catch (error) {
        console.log(error);
        
    }
}

export default createToken;