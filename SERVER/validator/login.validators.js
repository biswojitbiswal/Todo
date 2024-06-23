import {z} from 'zod'

const loginSchema = z.object({
    email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message: "Email is not valid"})
        .min(5, ({message: "Email must be atleast 5 character"}))
        .max(255, ({message: "Email must not be more than 25 character"})),
    password: z
        .string({required_error: "Password is required"})
        .trim()
        .min(8, ({message: "Password must be atleast 8 character"}))
        .max(26, ({message: "Password must not be more than 26 character"})),
})

export default loginSchema