const { User } = require("../models/user.model");

const sendMsg = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(404).json("User not found");

    const userId = user._id;

    const msg = await Messages.create({
      message: {
        text: req.body.text,
        from: req.body.from,
        to: userId,
      },
    });
    res.status(200).json("Message sent");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { sendMsg };
