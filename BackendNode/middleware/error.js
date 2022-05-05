const errorHandler = (err, req, res, next) => {
    console.log('Errores en el controller', err);

    res.status(500).json({
        status: 500,
        message: err.message
    });
}

module.exports = errorHandler;