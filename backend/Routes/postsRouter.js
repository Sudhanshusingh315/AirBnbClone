const router = require('express').Router();
const protected = require('../Middleware/protected');
const postController = require('../Controller/postController');
router.post('/newPost',postController.newPost);
router.get('/',postController.getPost);
router.get('/places',postController.getPostById);
router.put('/places',postController.updatePost);
router.get('/getAllPost',postController.getAllPost);
module.exports.router = router;