const jwt = require('jsonwebtoken');

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

module.exports = authenticate;