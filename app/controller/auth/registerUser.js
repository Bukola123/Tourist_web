const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../model/User');


exports.registerUser = async function (req, res) {
    //  check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password, name } = req.body;
    //  hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        email,
        name,
        password: hashedPassword
    });

    // save the user
    try {
        await user.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }
        return res.status(500).json({ msg: 'Internal server error' });
    }

    res.status(201).json({ msg: 'Registration Successful' });
};
