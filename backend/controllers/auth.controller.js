import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const {
      fullname,
      username,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = req.body;

    const isUserExist = await User.findOne({ username });

    if (isUserExist) {
      return res.status(409).json({
        message: "User already exist.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // create new user in memory of document
    const newUser = User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      // generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).send({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invalid User data",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = (req, res) => {
  console.login("here");
};

export { signup, login };
