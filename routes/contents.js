const express = require('express');
const multer = require('multer');


const {
    createContentValidation

} = require('../app/middleware/contentValidation');
const {
    createContent,
    retrieveAllContents
} = require('../app/controller/contents');
const auth = require('../app/middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'tmp/' });

router.post('/', [auth,upload.single('images')], createContent);
router.get('/', auth, retrieveAllContents);

module.exports = router;
