const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
// const randomize = require("randomatic");

const app = express();
const PORT = 5000;

mongoose.connect(
  "mongodb+srv://priyanshg615:Jc6dvfqy1%40@cluster0.2xgudc9.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());

const User = mongoose.model("User", {
  username: String,
  password: String,
  Branch: String,
});

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "no-reply-prians@outlook.com",
    pass: "Aman@1234",
  },
});

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};
const otpStore = {};

app.post("/api/register", async (req, res) => {
  try {
    const { username, password, Branch } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      Branch,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    otpStore[email] = otp;
    const mailOptions = {
      from: "no-reply-prians@outlook.com",
      to: email,
      subject: "Your OTP for verification",
      text: `Your OTP is: ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        localStorage.setItem("OTP", otp);
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ username: email });

    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
