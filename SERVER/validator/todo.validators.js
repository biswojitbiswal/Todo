import {z} from 'zod'

const todoSchema = z.object({
    note: z
        .string({required_error: "Todo is required"})
        .trim()
        .min(3, ({message: "Todo must be atleast 3 character"}))
        .max(25, ({message: "Todo must not be more than 25 character"})),
    
    date: z
        .string({required_error: "date is required"})
        .trim()
})

export default todoSchema