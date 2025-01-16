import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
export function generateJWT(jwtPayload:JwtPayload):string {
    const key = process.env.JWT_KEY as string
    const token = jwt.sign(jwtPayload , key , {
        expiresIn:"30d"
    })
    return token;
}