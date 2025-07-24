const jwt = require('jsonwebtoken');
const apiError = require('../utils/ApiError');

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next(new apiError('Unauthorized', 401));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return next(new apiError('Forbidden', 403));
      }
      next();
    } catch (err) {
      next(new apiError('Invalid token', 401));
    }
  };
};
