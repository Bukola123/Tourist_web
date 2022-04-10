const { check } = require('express-validator');


exports.contentValidation = [
    check('body', 'content is required').not().isEmpty().isString()
];
exports.createContentValidation = [
    check('body', 'content is required').not().isEmpty().isString(),
    check('images', 'Please upload an image').not().isEmpty().isString()
];
