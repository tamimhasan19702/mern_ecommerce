/** @format */

//require sign-in

const requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

exports.userMiddleware = (req, res, next) => {};


exports.adminMiddleware = (req, res, next) => {
  if(req.user.role !== 'admin'){
    return res.status(400).json({ message: 'Access denied!'})
  }
  next();
};
