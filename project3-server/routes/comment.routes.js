const router = require('express').Router();

const User = require('../models/User.model');
const Restaurant = require('../models/Restaurant.model');
const Comment = require("../models/Comment.model")

router.post('/restaurants/comments', (req, res, next) => {
  const { author, restaurant, content, imageUrl} = req.body;

  let newComment;

  Comment.create({ author, restaurant, content, imageUrl })
    .then((comment) => {
        newComment = comment;
      return Restaurant.findByIdAndUpdate(restaurant, { $push: { comments: newComment._id } }, { new: true });
    })
    .then(() => {
        return User.findByIdAndUpdate(author, { $push: { comments: newComment._id } }, { new: true });
      })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put('/restaurants/comments/:commentId', (req, res, next) => {
    const { commentId } = req.params;
    const {_id} = req.payload;

  Comment.findById(commentId)
  .then((foundComment)=>{
  if(foundComment.author != _id) {
    res.status(403).json({errorMessage: "You don´t have permisson"})
    return
  } else {
    Comment.findByIdAndUpdate(commentId, req.body, { new: true })

    .then((response) => res.json(response))
  }
})
.catch((err) => res.json(err));

});



router.delete('/restaurants/comments/:commentId', (req, res, next) => {
    const { commentId } = req.params;
    const {_id} = req.payload;
   let deletedComment;

Comment.findById(commentId)

.then((foundComment)=>{
  if(foundComment.author != _id) {
    res.status(403).json({errorMessage: "You don´t have permisson"})
    return
  } else {
     Comment.findByIdAndRemove(commentId)
      .then((comment) => {
        deletedComment = comment;
        return Restaurant.findByIdAndUpdate(deletedComment.restaurant, { $pull: { comments: commentId} }, { new: true });
      })
      .then(() => {
        return User.findByIdAndUpdate(deletedComment.author, { $pull: { comments: commentId} }, { new: true });
      })
      .then((response) => res.json(response))  
  }
})
.catch((err) => res.json(err));
  });



module.exports = router;