import {z} from 'zod'

const contactDataSchema = z.object({
    email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message: "Email is not valid"})
        .min(5, ({message: "Email must be atleast 5 character"}))
        .max(25, ({message: "Email must not be more than 25 character"})),
    message: z
        .string({required_error: "Message is required"})
        .trim()
        .min(8, ({message: "Message must be atleast 8 character"}))
        .max(255, ({message: "Message must not be more than 255 character"})),
})

export default contactDataSchema