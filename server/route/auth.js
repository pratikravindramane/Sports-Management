const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  login,
  adminLogin,
  register,
  logout,
  viewSports,
  changePassword,
  viewOneSports,
} = require("../controller/authController");

const route = require("express").Router();

// routes
route.post("/login/", login);
route.post("/admin/", adminLogin);
route.post("/register/", register);
route.get("/logout/", authMiddleware, logout);
route.get('/sports',viewSports)
route.get("/sports/:id", viewOneSports);
route.put("/change-password", changePassword);


module.exports = route;
