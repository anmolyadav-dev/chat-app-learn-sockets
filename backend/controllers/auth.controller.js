import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateJwt.js";
export const signupUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password != confirmPassword)
      return res.status(400).json({ error: "passwords do not match" });

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    // hash passwords here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // random user Avatar - API
    // https://avatar-placeholder.iran.liara.run
    // https://avatar.iran.liara.run/public/boy
    // https://avatar.iran.liara.run/public/boy?username = ""

    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName: fullName,
      username: username,
      password: hashedPassword,
      gender: gender,
      avatar: gender === "male" ? boyAvatar : girlAvatar,
    });

    if (newUser) {
      // generate jwt token and set cookie
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        avatar: newUser.avatar,
      });
    }
  } catch (error) {
    console.log("error signing up the user", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    // matching hashed pass
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    // generate jwt and set cookie
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log("error logging in the user", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error logging out the user", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
