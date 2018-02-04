const express = require('express');
const bodyParser = require('body-parser');
const Comment = require('../model/comments');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized' });
});

router.route('/comments')
  // retrieving all comments from database using Comment Schema
  .get((req, res) => {
    Comment.find({}, (err, comments) => {
      if (err) {
        return res.json({ error: 'error fetching comments' });
      }
      return res.json({ comments });
    });
  })
  // post comment
  .post((req, res) => {
    Comment.create({
      author: req.body.author,
      text: req.body.text,
    })
      .then(comment => (
        res.json({
          message: 'Your comment have been posted',
          comment,
        })
      ))
      .catch(err => (
        res.status(500).json({ error: 'failed to post your comment' })
      ));
  });

router.route('/comments/:commentID')
  // update comment
  .put((req, res) => {
    Comment.findByIdAndUpdate(
      req.params.commentID,
      req.body,
      { new: true },
      (err, comment) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        return res.json({ message: 'comment successfully updated', comment });
      },
    );
  })
  // delete comment
  .delete((req, res) => {
    Comment.findByIdAndRemove(req.params.commentID, (err, comment) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      return res.json({
        message: 'comment successfully deleted',
        comment,
      });
    });
  });

module.exports = router;
