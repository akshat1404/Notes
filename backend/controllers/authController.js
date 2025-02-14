const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const {email, name, password } = req.body;
  try {

    let user= await User.findOne({ email });

    if(user){
      return res.status(400).json({ error: 'User already exists' });
    }

    user=new User({
      name,email,password
    })

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ error: 'Invalid Email Or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};