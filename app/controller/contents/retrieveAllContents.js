const Content = require('../../model/Contents');

exports.retrieveAllContents = async (req, res) => {
    try {
        const contents = await Content.find().populate();
        res.json(contents);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};

