const express = require('express');
//const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');
const router = express.Router();

// blog routes

// blog create get
router.get('/create', blogController.blog_create_get);

// blog index
router.get('/', blogController.blog_index); 

// create post
router.post('/', blogController.blog_create_post);

// blog details
router.get('/:id', blogController.blog_details);

// blog delete
router.delete('/:id', blogController.blog_delete);

module.exports = router;
