const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../model/User');
const path = require('path');

exports.newregisterAdmin = function(req, res){
    res.sendFile(path.join(__dirname, "../../../views/public/registerAdmin.html"))
};



exports.saveDataAdmin = async function (req, res) {
    
    //  check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { firstName,lastName, email,password} = req.body;

    //  hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        lastName,
        firstName,
        email,
        password: hashedPassword,
        isAdmin: true
    });

    // save the user
    try {
        await user.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists, login instead' }]
            });
        }
        
        return res.status(500).json({ msg: 'Internal server error' });
    }

    return user
//setTimeout(() => res.sendFile(path.join(__dirname, "../../../views/public/registerUser.js")), 4000)
};
