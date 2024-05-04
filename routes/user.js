const path = require('path');
const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller');
const userValidator = require('../validators/userValidator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


router.post('/api/auth/register', usercontroller.register);
router.post('/api/auth/login', usercontroller.login);
router.post('/api/auth/logout', usercontroller.logout);


router.get('/api/customers', usercontroller.findAll);
router.get('/api/customers/:id', usercontroller.findone);
router.post('/api/customers', usercontroller.createUser);
router.put('/api/customers/:id', usercontroller.updateUser);
router.delete('/api/customers/:id', usercontroller.deleteUser);


module.exports = router;
