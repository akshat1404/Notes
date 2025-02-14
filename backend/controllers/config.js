const User = require("../models/User");

exports.config = async (req, res) => {
  const userId = req.userId;
  try {
    let user = await User.findOne({ _id:userId });
    res.json({name:user.name,email:user.email});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};