const validationResult = require("express-validator");
exports.checkError =(req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
        } else {
            next();
        }
    }