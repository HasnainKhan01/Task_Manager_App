const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth Token:', token);
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};