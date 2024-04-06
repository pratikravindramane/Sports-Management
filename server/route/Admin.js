const {
  createUser,
  createEvent,
  viewFeedback,
  viewTeacher,
  viewStudent,
  deleteUser,
  deleteEvent,
} = require("../controller/Admin");

const router = require("express").Router();
// Admin routes
router.post("/create-user", createUser);

router.post("/create-event", createEvent);

router.get("/view-feedback", viewFeedback);
router.get("/view-teachers", viewTeacher);
router.get("/view-students", viewStudent);
router.delete("/delete/user/:id", deleteUser);
router.delete("/delete/event/:id", deleteEvent);

module.exports = router;
