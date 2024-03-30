// studentRoutes.js
const express = require("express");
const {
  registerEvent,
  viewNotifications,
  viewTeams,
  viewTeam,
  byEventTeam,
} = require("../controller/StudentController");
const router = express.Router();

router.put("/register-event/:eventId", registerEvent);
router.get("/notifications/:id", viewNotifications);
router.get("/teams", viewTeams);
router.get("/by-event/teams/:id", byEventTeam);
router.get("/one/team/:id", viewTeam);

module.exports = router;
