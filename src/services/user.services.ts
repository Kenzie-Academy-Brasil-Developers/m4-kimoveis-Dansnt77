import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { UserCreate, UserRead, UserRepo, UserReturn, UserUpdate } from "../interfaces/user.interfaces";
import userRepository from "../repositories/user.repository";
import { userReadSchema, userReturnSchema } from "../schemas/user.schemas";

const createServices = async (payload: UserCreate): Promise<UserReturn> => {
    const user: User = userRepository.create(payload)
    await userRepository.save(user)

    return userReturnSchema.parse(user)
}

const readServices = async (admin: boolean): Promise<UserRead> => {
    if(admin){
        const users: Array<User> = await userRepository.find({withDeleted: true})
        return userReadSchema.parse(users)
    }

    return userReadSchema.parse(await userRepository.find())
}

const updateServices = async (user: User, payload: UserUpdate): Promise<UserReturn> => {
    const repo: UserRepo = AppDataSource.getRepository(User)
    const newUser = repo.create({...user, ...payload})
    await repo.save(newUser)
    return userReturnSchema.parse(newUser)
}

const destroyServices = async (user: User): Promise<void> => {
    await userRepository.softRemove(user)
}

export {createServices, readServices, updateServices, destroyServices}