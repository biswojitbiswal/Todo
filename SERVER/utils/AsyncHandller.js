const AsyncHandller = (requestHandller) => {
    return (req, res, next) => {
        Promise.resolve(requestHandller(req, res, next)).catch((err) => next(err))
    }
}

export {AsyncHandller}