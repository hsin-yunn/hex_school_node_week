const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const responseHelper = require('../helpers/responseHelper');

//index
router.get('/', async function (req, res, next) {
  try {
    const posts = await Post.find();
    res.status(200).json({
      data: posts,
    });
  } catch (err) {
    responseHelper.errorHandler(res, 400, 'get posts error');
  }
});
//store
router.post('/', async function (req, res, next) {
  try {
    const postData = req.body;
    //name check
    if (!postData.name) {
      responseHelper.errorHandler(res, 400, 'name is required');
    } else if (!postData.content) {
      responseHelper.errorHandler(res, 400, 'name is required');
    } else {
      const post = await Post.create(postData);
      res.status(201).json({
        data: post,
      });
    }
  } catch (err) {
    responseHelper.errorHandler(res, 400, 'data format is not correct');
  }
});
//update
router.patch('/:id', async function (req, res, next) {
  try {
    const postData = req.body;
    //name check
    if (!postData.name) {
      responseHelper.errorHandler(res, 400, 'name is required');
    } else if (!postData.content) {
      responseHelper.errorHandler(res, 400, 'name is required');
    } else {
      const _id = req.params.id;
      const post = await Post.findByIdAndUpdate(_id, postData, {
        new: true,
      });
      if (!post) {
        responseHelper.errorHandler(res, 400, 'data is not exist.');
      } else {
        res.status(200).json({
          data: post,
        });
      }
    }
  } catch (err) {
    responseHelper.errorHandler(res, 400, 'data format is not correct');
  }
});
//delete
router.delete('/:id', async function (req, res, next) {
  const _id = req.params.id;
  await Post.findByIdAndDelete(_id).then((data) => {
    if (!data) {
      responseHelper.errorHandler(res, 400, 'data is not exist.');
    } else {
      res.status(201).json({
        status: 'success',
        message: 'data delete',
      });
    }
  });
});
//delete all
router.delete('/', async function (req, res, next) {
  await Post.deleteMany({});
  res.status(201).json({
    data: [],
  });
});
//show
router.get('/:id', async function (req, res, next) {
  const _id = req.params.id;
  const post = await Post.findById(_id);
  if (!post) {
    responseHelper.errorHandler(res, 400, 'data is not exist.');
  } else {
    res.status(200).json({
      data: post,
    });
  }
});
module.exports = router;
