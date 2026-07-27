// app_api/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;

    res.status(status).json({
        success: false,
        message: process.env.NODE_ENV === 'development'
            ? err.message
            : "Internal Server Error"
            //  done for testing message: err.message || "Internal Server Error"
});
};

module.exports = errorHandler;