import User from "../models/user.model"
import { genHash } from "./auth.service"
import { parseMongoError } from "../utils/errorParser"

export const getUserData = async (userName: string) => {
    try {
        const userFound = await User.findOne({ userName: userName }).select({ password: 0 }).exec()
        if (!userFound) return { done: false, message: "Something went wrong" }
        else return { done: true, message: userFound.toObject() }
    } catch (error) {
        return { done: false, message: parseMongoError(error) }
    }
}



export const updateUserData = async (userName: string, userData: Record<string, any>) => {
    try {
        const newRecord = {
            ...userData,
            password: userData?.password ? genHash(userData?.password) : undefined
        }
        const updated = await User.updateOne({ userName: userName }, newRecord)
        if (updated.matchedCount == 0) return { done: false, message: "Something went wrong" }
        else return { done: true }
    } catch (error) {
        return { done: false, message: parseMongoError(error) }
    }
}

