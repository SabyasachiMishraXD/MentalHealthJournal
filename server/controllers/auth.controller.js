import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: "User registered", user: newUser });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ msg: "Invalid password" });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res
  .cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax", // or "None" if using HTTPS
    secure: false, // set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
  .status(200)
  .json({ msg: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Logout - clear cookie
export const logoutUser = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false // set true if using https
  });
  res.status(200).json({ msg: 'Logout successful' });
};