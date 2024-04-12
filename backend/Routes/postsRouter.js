const router = require('express').Router();
const protected = require('../Middleware/protected');
const postController = require('../Controller/postController');
router.post('/newPost',protected,postController.newPost);
router.get('/',protected,postController.getPost);
module.exports.router = router;