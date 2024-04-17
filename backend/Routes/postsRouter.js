const router = require('express').Router();
const protected = require('../Middleware/protected');
const postController = require('../Controller/postController');
router.post('/newPost',protected,postController.newPost);
router.get('/',protected,postController.getPost);
router.get('/places',protected,postController.getPostById);
router.put('/places',protected,postController.updatePost);
router.get('/getAllPost',postController.getAllPost);
module.exports.router = router;