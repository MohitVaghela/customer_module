const { body, query } = require("express-validator");
const User = require("../models/user");
exports.register = () => {
    return [
        body('name', 'Name is required').isString(),
        body('number', 'Phone number is required').isString(),
        body('email', 'Email is required').isEmail()
            .custom((email, { req }) => {
                return User.findOne({
                    email: email,
                    // type: 'user'
                }).then(user => {
                    if (user) {
                        // throw new Error('User Already Exists');
                        throw ('User Already Exists');
                    } else {
                        return true;
                    }
                }).catch(e => {
                    throw new Error(e);
                })
            }),
        body('password', 'Password is required').isAlphanumeric()
            .isLength({ min: 8, max: 20 })
            .withMessage('Pasword must be between 8-20 characters'),
    ];
}
