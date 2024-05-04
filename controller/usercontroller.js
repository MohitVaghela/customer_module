
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    let { name, email, password, number, gender, address, profile } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({ name, email, password: hash, number, gender, address, profile });
            if (createdUser) {
                res.send(createdUser);
            }
        });
    })
}
exports.findAll = async (req, res) => {
    let users = await userModel.find();
    res.send(users);
}
exports.findone = async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.id });
    res.send(user);
}
exports.login = async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
            if(err) console.log(err);
            if (result) {
                let token = await jwt.sign({ email: email, password: password }, 'radix');
                res.cookie('token', token);
                res.send(token);
            } else {
                res.status(404).send('credential do not match');
            }
        })
    } else {
        res.status(404).send('credential do not match');
    }
}
exports.logout = async (req, res) => {
    res.cookie('token', '');
    res.send('Admin logged Out');
}
exports.createUser = async (req, res) => {
    token = req.cookies['token'];
    if (token) {
        let varifyData = jwt.verify(token, 'radix');
        let Adminuser = await userModel.findOne({ email: varifyData.email });
        if (Adminuser) {
            let { name, email, password, number, gender, address, profile } = req.body;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    let createdUser = await userModel.create({ name, email, password: hash, number, gender, address, profile });
                    if (createdUser) {
                        res.send(createdUser);
                    }
                });
            })
        } else {
            res.send("Your are not authorise to perform this action")
        }
    } else {
        res.send("Your are not authorise to perform this action")
    }
}
exports.updateUser = async (req, res, next) => {
    token = req.cookies['token'];
    if (token) {
        let varifyData = jwt.verify(token, 'radix');
        let Adminuser = await userModel.findOne({ email: varifyData.email });
        if (Adminuser) {
            let foundUser = await userModel.findOne({ _id: req.params.id });
            if (foundUser) {
                let password = req.body.password;
                let updatedData = req.body;
                if (password) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, async (err, hash) => {
                            let updatedUser = await userModel.findOneAndUpdate(
                                { _id: foundUser._id },
                                { $set: updatedData },
                                { new: true });
                            let updatedUserN = await userModel.findOneAndUpdate({ _id: req.params.id }, { password: hash }, { new: true });
                            if (updatedUserN) {
                                res.send(updatedUserN);
                            }
                        });
                    })
                } else {
                    let updatedUser = await userModel.findOneAndUpdate(
                        { _id: foundUser._id },
                        { $set: updatedData },
                        { new: true });
                    if (updatedUser) {
                        res.send(updatedUser);
                    }
                }
            } else {
                res.send("user not available");
            }
        } else {
            res.send("Your are not authorise to perform this action");
        }
    } else {
        res.send("Your are not authorise to perform this action");
    }
}
exports.deleteUser= async(req,res)=>{
    token = req.cookies['token'];
    if (token) {
        let varifyData = jwt.verify(token, 'radix');
        let Adminuser = await userModel.findOne({ email: varifyData.email });
        if (Adminuser) {
            let foundUser = await userModel.findOne({ _id: req.params.id });
            if (foundUser) {
                let deleteUser = await userModel.findOneAndDelete({ _id: req.params.id });
                res.send("user delete"+ deleteUser);
            } else {
                res.send("user not available");
            }
        } else {
            res.send("Your are not authorise to perform this action");
        }
    } else {
        res.send("Your are not authorise to perform this action");
    }
}