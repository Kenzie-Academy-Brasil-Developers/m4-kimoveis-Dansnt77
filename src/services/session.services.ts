import { compare } from "bcryptjs";
import { AppError } from "../errors/App.error";
import { SessionCreate, SessionReturn } from "../interfaces/session.interfaces";
import userRepository from "../repositories/user.repository";
import { sign } from "jsonwebtoken"
import { User } from "../entities";

const create = async ({email, password,}: SessionCreate): Promise<SessionReturn> =>{
    const foundUser: User | null = await userRepository.findOneBy({email})

    if(!foundUser) {
        throw new AppError("Invalid credentials", 401)
    }

    const samePassword: Boolean = await compare(password, foundUser.password)

    if(!samePassword){
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = sign({admin: foundUser.admin}, process.env.SECRET_KEY!, { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! })

    return {token}
}

export { create }