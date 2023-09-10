const errorMiddleware = async(err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode); 
    res.json({message: err.message, stacK: process.env.NODE_ENV === "development" ? err.stack : null })
}

module.exports = errorMiddleware;