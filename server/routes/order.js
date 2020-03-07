const router = require("express").Router();
const Order = require("../models/order");
const verifyToken = require("../middlewares/verify-token");

// @desc    Get orders
// @route   GET /api/v1/orders
// @access  Public
router.get("/orders", verifyToken, async (req, res) => {
  try {
    let products = await Order.find({ owner: req.decoded._id })
      .deepPopulate("owner products.productID.owner")
      .exec();

    res.json({
      success: true,
      products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
