import express from "express"
import { signUp, logIn, logOut, forgotPassword, resetPassword, refreshToken, changePasswordOrEmail } from "../controllers/auth.controller"
import { auth, authIgnoringExpiry } from "../middlewares/auth"
import { verifyMailerConnection, verifyMongoConnection } from "../middlewares/checkConnection"
import { validate } from "../middlewares/validate"
import { addUserReqBody, forgotPasswordReqBody, logInReqBody, logOutReqBody, refreshTokenReqBody, resetPasswordReqBody, signUpReqBody } from "../validations/auth.validation"
import { changePasswordOrEmailReqBody } from "../validations/user.validation"

const router = express.Router()

router.post("/signUp", validate(signUpReqBody), verifyMongoConnection, signUp)

router.post("/logIn", validate(logInReqBody), verifyMongoConnection, logIn)

router.post("/logOut", auth(), validate(logOutReqBody), verifyMongoConnection, logOut)

router.post("/forgotPassword", validate(forgotPasswordReqBody), verifyMongoConnection, verifyMailerConnection, forgotPassword)
router.post("/resetPassword", validate(resetPasswordReqBody), verifyMongoConnection, resetPassword)
router.post("/refreshToken", authIgnoringExpiry(), validate(refreshTokenReqBody), verifyMongoConnection, refreshToken)
router.patch("/modifyAuth", auth(), validate(changePasswordOrEmailReqBody), verifyMongoConnection, changePasswordOrEmail)


router.post("/addUser", auth("admin"), validate(addUserReqBody), signUp)

export default router