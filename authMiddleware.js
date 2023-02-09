const jsonwebtoken = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
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

    // // TODO move to middleware
    // const token = req.headers.authorization.split(' ')[1];
    // if(!token) return res.status(401).json('Unauthorize user')

    // try{
    //     const decoded = jsonwebtoken.verify(token, req.app.locals.JWT_SECRET);
    //     req.jwtInfo = decoded

    //     console.log(decoded);
    //     // next() -> cuando esté en middleware

    // }catch(e){
    //     console.log(e);
    //     res.status(400).json('Token not valid')
    //     return
    // }
    // // TODO hasta aquí