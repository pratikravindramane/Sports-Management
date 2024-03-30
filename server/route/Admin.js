const {
  createUser,
  createEvent,
  viewFeedback,
  viewTeacher,
  viewStudent,
} = require("../controller/Admin");

const router = require("express").Router();
// Admin routes
router.post("/create-user", createUser);

router.post("/create-event", createEvent);

router.get("/view-feedback", viewFeedback);
router.get("/view-teachers", viewTeacher);
router.get("/view-students", viewStudent);

module.exports = router;
