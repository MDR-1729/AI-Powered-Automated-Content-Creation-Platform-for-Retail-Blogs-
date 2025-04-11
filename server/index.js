const express = require('express');
const axios = require('axios');
// require('dotenv').config();
const cors = require('cors')
const User = require('./signup');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const JWT_SECRET = 'genAi'; 

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://majjidurgareddy166:7xwiVq6gaN8r1PbN@cluster0.m416izr.mongodb.net/").then(()=>{
  console.log("mongodb connected")
}).catch((err)=>{console.log(err)})

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};

app.use(cors(corsOptions));

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyALvtemHHGS7c4W41NcFMfyhYL1Lkn5c0Q";
const GEMINI_URL =` https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

app.post('/product-info', async (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ error: 'Product name is required' });
  }

  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `Give detailed information about the product named "${product}". Include its features, uses, and any other relevant info.`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No details found.";
    res.json({ productDetails: result });
  } catch (error) {
    console.error('Error fetching product details:', error.message);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});


// Signup Controller
app.post("/signup", async (req, res) => {
    const { name, password } = req.body;

    try {
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ name, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error during signup' });
    }
})

// Login Controller
app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});