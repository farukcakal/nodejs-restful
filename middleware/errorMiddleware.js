const errorCatcher = (err, req, res, next) => {
    
    //console.log(err);

    if(err.code === 11000){
        return res.json({
            errorCode: 400,
            message: Object.keys(err.keyValue) + " entered for " + Object.values(err.keyValue) + " must be unique."
        })
    }

    if (err.code === 66){
        return res.json({
            errorCode: 400,
            message: "You tried to update an immutable data."
        })
    }

    res.status(err.statusCode || 500);
    res.json({
        errorCode: err.statusCode || 400,
        message: err.message
    });
}

module.exports = errorCatcher;