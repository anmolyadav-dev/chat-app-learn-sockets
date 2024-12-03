import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, //prevent xss attack
    sameSite: "strict", // CSRF attacks cross-site request forgery attack
    secure: process.env.NODE_ENV !== "development", // this will set secure = true if we are not in development mode... that is set secure = true in production
  });
};

export default generateTokenAndSetCookie;
