const Review = require("../../models/Review");

module.exports = async (req, res, next) => {
  const data = req.body;
  try {
    const review = new Review(data);
    await review.save();
    res.json({ msg: "Review created", review });
  } catch (err) {
    next(err);
  }
};