const { unlink } = require('fs/promises');
const { validationResult } = require('express-validator');
const Content = require('../../model/Contents');
const User = require('../../model/User');
const cloudinary = require('cloudinary').v2;

exports.createContent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            errors: [{ msg: 'User not found' }]
        });
    }
    if(!user.isAdmin){
        return res.status(404).json({
            errors: [{ msg: 'User can not perform this option' }]
        });
    }

    const { body } = req.body;
    const content = new Content({
        body,
        author: req.user.id
    });

    try {
        await content.save();
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Content already exists'
                    }
                ]
            });
        }
        
        res.status(500).send('Server Error');
    }


    if (req.file) {
        // check that provided file is an image
        if (!req.file.originalname.endsWith('jpeg') && !req.file.originalname.endsWith('jpg')) {
            await unlink(`${req.file.path}`);
            return res
                .status(400)
                .json({ errors: [{ msg: 'Please upload a valid jpeg file' }] });
        }

        // upload image to cloudinary
        try {
            const images = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                public_id: `Tourist/contents/${content._id}}/images`,
                overwrite: true
            });
            content.images = images.secure_url;
            content.save();
            // delete old avatar
            await unlink(`${req.file.path}`);
        } catch (error) {
            return res
                .status(500)
                .json({ errors: [{ msg: 'Error uploading image' }] });
        }
    };


    res.status(201).json({ msg: 'Post created', content });
};
