const admin = (req, res, next) => {
    if(req.user && !req.user.isAdmin){
        return res.status(403).json({
            message: 'Your request is denied !'
        });
    }
    next();
};

module.exports = admin;