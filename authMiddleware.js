const jsonwebtoken = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized user'
    });
  }

  try {
    const decoded = jsonwebtoken.verify(token, req.app.locals.JWT_SECRET);
    req.jwtInfo = decoded;

    console.log(decoded);
    next();

  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: 'Token not valid'
    });
    return 
  }
}

module.exports = authMiddleware;