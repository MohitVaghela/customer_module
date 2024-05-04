const mongoose = require("mongoose");
const validator = require("validator");
const env = require('../environment/env');

mongoose.connect(env.dbstring);

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Please enter a valid E-mail!");
            }
          },
    },
    password: { type: String, required: true, },
    number: { type: Number, required: true, },
    gender: {
        type: String,
        validate: {
            validator: function (value) {
                return ['male', 'female', 'other'].includes(value);
            },
            required: true,
        }
    },
    address: { type: String },
    profile: { type: String }
})

module.exports = mongoose.model('user',userSchema);