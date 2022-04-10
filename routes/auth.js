const express = require('express');
const {
    authCredentialsValidation,
    registrationValidation,
    passwordValidation,
    emailValidation
} = require('../app/middleware/authValidation');
const {
    registerAdmin,
    registerUser,
    loginUser,
    newregisterAdmin,
    saveDataAdmin
} = require('../app/controller/auth/index');


const router = express.Router();

router.get('/register/admin', registrationValidation, newregisterAdmin);
//router.post('/register/admin', registrationValidation, registerAdmin);
router.post('/register', registrationValidation, registerUser);

router.post('/login', authCredentialsValidation, loginUser);
router.post('/form',saveDataAdmin)

module.exports = router;
