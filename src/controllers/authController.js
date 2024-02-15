const jwt = require("jsonwebtoken");

const authController = {
  Login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email === "admin@gmail.com" && password === "admin") {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({
          success: true,
          message: "Login successful",
          token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "You have no access",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Server error while Login.",
      });
    }
  },
};

module.exports = authController;
