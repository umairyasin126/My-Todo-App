import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


// Registering User

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
  
    if(user) return next(new ErrorHandler("User Already Exist", 400));
  
    const hashPassword = await bcrypt.hash(password, 10);
  
    user = await User.create({ name, email, password: hashPassword });
  
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
 
};


//Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  //select is used because of select: false in database
  const user = await User.findOne({ email }).select("+password");

  if(!user) return next(new ErrorHandler("Invalid email or password", 400));
  
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) return next(new ErrorHandler("Invalid email or password", 400));
 

  sendCookie(user, res, `Welcome back, ${user.name}`, 200);

  } catch (error) {
    next(error);
  }
  
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

//Logout

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { 
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Developement" ? "lax": "none",
      secure: process.env.NODE_ENV === "Developement" ? false: true,
     })
    .json({
      success: true,
    });
};

// export const updateUser = async (req,res) => {
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         message: "Updated"
//     })
// }

// export const deleteUser = async (req,res) => {
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         message: "Deleted Succesfully"
//     })
// }
