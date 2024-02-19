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
  email: String,
  name: String,
  password: String,
  branch: String,
  order: [
    {
      title: String,
      quantity: String,
    },
  ],
  messages: [
    {
      from: String,
      message: String,
      timestamp: String,
    },
  ],
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "priyanshg.jobs@gmail.com",
    pass: "edsj elqa tbyd ffto",
  },
});

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};
const otpStore = {};

app.post("/api/register", async (req, res) => {
  try {
    const { email, password, branch, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      name,
      password: hashedPassword,
      branch,
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
    const { email, password, Branch } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      Branch === user.branch
    ) {
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.status(200).json({ token, message: "Logged in Successfully", user });
    } else {
      res
        .status(401)
        .json({ error: "Invalid credentials", message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Internal Server Error",
    });
  }
});

const users = {};

app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const otp = generateOTP();

  const mailOptions = {
    from: "priyanshg.jobs@gmail.com", // Your Gmail email address
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Failed to create an order" });
    }

    res.json({ message: "Ordered Successfully" });
  });
});

app.post("/api/verify-otp", async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  const user = users[email];

  if (!user || user.otp !== otp) {
    return res.status(401).json({ error: "Invalid OTP" });
  }

  const timeElapsed = Date.now() - user.timestamp;

  if (timeElapsed > 5 * 60 * 1000) {
    return res.status(401).json({ error: "OTP has expired" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  res.json({ message: "OTP verified successfully" });
});

app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(200).json({ exists: true, user });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/contact-us", async (req, res) => {
  const { fromEmail, ToEmail, name, message } = req.body;

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
        <h2 style="color: #333;">${name} has a query</h2>
      </div>
      <div style="padding: 20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${fromEmail}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
      <div style="background-color: #f8f8f8; padding: 10px; text-align: center;">
        <p style="color: #777; font-size: 12px;">Your Company Name | Address | Phone</p>
      </div>
    </div>
  `;
  const mailOptions = {
    from: "priyanshg.jobs@gmail.com", // Your Gmail email address
    to: ToEmail,
    subject: "Someone has a query",
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Failed to send Message" });
    }

    res.json({ message: "Message sent successfully" });
  });
});

app.post("/api/checkout", async (req, res) => {
  const { data } = req.body;
  const emailContent = data;
  const mailOptions = {
    from: "priyanshg.jobs@gmail.com",
    to: "priyanshg615@gmail.com",
    subject: "New Order",
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Failed to send Message" });
    }

    res.json({ message: "Message sent successfully" });
  });
});

app.post("/api/orders", async (req, res) => {
  try {
    const { email, orders } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newItems = orders.map((order) => ({
      title: order.title,
      quantity: order.quantity,
    }));

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { order: { $each: newItems } } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Order updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/get-orders", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ orders: user.order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/alerts", async (req, res) => {
  try {
    const { fromEmail, ToEmail, name, message, timestamp } = req.body;
    const user = await User.findOne({ email: ToEmail });
    console.log(timestamp);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newItems = [
      { from: fromEmail, message: message, timestamp: timestamp },
    ];

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { messages: { $each: newItems } } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Messages updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error fetching Messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/get-alerts", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ messages: user.messages });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
