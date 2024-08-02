import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/admin.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log('admin protect');
  token = req.cookies.jwt;

  if (token) {
    try {
      console.log('inside the try');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Admin.findById(decoded.userId).select('-password');
      console.log('before next');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized,no token');
    }
  }else{
    console.log('No token');
  }
});

export { protect }