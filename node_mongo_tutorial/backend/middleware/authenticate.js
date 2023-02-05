const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const {User} = require('../models/userModel')

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(400).json({ error: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded._id;
    //console.log(req.user)
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

const authenticateUser = asyncHandler(async (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
    if (err) return res.status(400).json(err);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).json({ message: 'User logged in successfully!' });
  });
})  

module.exports = {authenticate, authenticateUser};