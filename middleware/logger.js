const logger = (req, res, next) => {
    req.userID = "killer";
    console.log(
        `${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`
    );
    next();
};

module.exports = logger;
