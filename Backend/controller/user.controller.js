import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import uploadoncloudinary from "../utils/cloudinary.js";
export const signup = async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;
  try {

     const imageloacalpath=  req.file.path;
      console.log(req.file.path)
     
   
   if(!imageloacalpath){
      res.status(401).json({
         message:"image file is required"
      })
   }

   const image=await uploadoncloudinary(imageloacalpath)
console.log("image is console",image.secure_url)

  
    if (!image || !image.secure_url) {
  return res.status(400).json({ error: "Image upload failed" });
}

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }
    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
      image:image.secure_url,
    });
    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
           image:image.secure_url,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};

// get the logged in user


export const logUsers=async(req,res)=>{
   try{
      const loggedInUser=req.user._id;


      const currentUsers=await User.find({_id:{$eq:loggedInUser}}).select("-password");
      res.status(201).json(currentUsers)

   }
   catch(error){
      console.log("Error in allUsers Controller: "+ error);

   }
};

