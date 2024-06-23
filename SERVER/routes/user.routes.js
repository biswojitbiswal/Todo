import { Router } from "express";
import { registerUser, loginUser, signWithGoogle, getCurrUser, editUserName, passwordReset, deleteUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import authVerify from "../middlewares/auth.middlewares.js";
import registerSchema from "../validator/register.validator.js";
import validate from "../middlewares/validate.middlewares.js";
import loginSchema from "../validator/login.validators.js";


const router = Router();

router.route("/").get( (req, res) => {
    res.send("hello world from homepage in todo")
})

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    validate(registerSchema),
    registerUser
);
router.route("/login").post(validate(loginSchema), loginUser);
router.route("/google").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    signWithGoogle
);
router.route("/getuser").get(authVerify, getCurrUser)
router.route("/editUserName/:id").patch(authVerify, editUserName)
router.route("/passChange").patch(authVerify, passwordReset)
router.route("/deleteUser/:id").delete(authVerify, deleteUser)


export default router