// teacherRoutes.js
const express = require("express");
const {
  viewStudents,
  createTeam,
  updateResults,
} = require("../controller/TeacherController");
const router = express.Router();

router.get("/view-students", viewStudents);
router.post("/create-team", createTeam);
router.put("/update-result/:id", updateResults);

module.exports = router;
