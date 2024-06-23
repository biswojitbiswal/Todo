const validate = (schema) => async(req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;

        next();
    } catch (err) {
        console.log(err)
        const status = 422;
        const message = 'Fill The Input Properly';
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails
        }

        console.log(error)
         next(error);
        // res.status(400).json({message: extraDetails})
    }
}

export default validate