import { Router } from "express";
import { contactData } from "../controllers/contact.controllers.js";
import authVerify from "../middlewares/auth.middlewares.js";
import contactDataSchema from "../validator/contact.validator.js";
import validate from "../middlewares/validate.middlewares.js";

const router = Router();


router.route("/form").post(authVerify, validate(contactDataSchema), contactData)

export default router