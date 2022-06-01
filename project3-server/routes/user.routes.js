const router = require('express').Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");


router.get("/profile/:userId", (req, res, next) => {
    const { userId } = req.params;
  
    User.findById(userId)
    .then((response) => 
      res.json(response))
    .catch((err) => res.json(err))
});

router.put('/profile/:userId', (req, res, next) => {
    const { userId } = req.params;
  
    Project.findByIdAndUpdate(userId, req.body, { new: true })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });



  module.exports = router;
