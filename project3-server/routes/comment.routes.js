const router = require('express').Router();

const User = require('../models/User.model');
const Restaurant = require('../models/Restaurant.model');

router.post('/restaurants/comments', (req, res, next) => {
  const { author, restaurant, content, imageUrl } = req.body;

  Comment.create({ author, restaurant, content, imageUrl })
    .then((newComment) => {
      return Restaurant.findByIdAndUpdate(restaurant, { $push: { comments: newComment._id } }, { new: true });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// router.put('/restaurants/comments', (req, res, next) => {
    
  
//     Comment.findByIdAndUpdate(projectId, req.body, { new: true })
//     .then((response) => res.json(response))
//     .catch((err) => res.json(err));
// });

//   router.delete('/restaurants/comments', (req, res, next) => {
//     const { author, restaurant, content, imageUrl } = req.body;
  
//     Comment.create({ author, restaurant, content, imageUrl })
//       .then((newComment) => {
//         return Restaurant.findByIdAndUpdate(restaurant, { $push: { comments: newComment._id } }, { new: true });
//       })
//       .then((response) => res.json(response))
//       .catch((err) => res.json(err));
//   });

module.exports = router;