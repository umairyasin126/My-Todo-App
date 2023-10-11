import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res, next) => {
  //we used cookieparser middleware in app.js so we can access cookies
    const {token} = req.cookies;
      
      if (!token)
      return res.status(404).json({
        success: false,
        message: "Login First",
      });  
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded._id);

      next(); //it will call next handler in the route. In our case it will be getMyProfile function in users.js(routes)
};