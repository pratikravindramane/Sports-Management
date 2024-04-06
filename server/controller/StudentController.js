const Event = require("../model/Event");
const Team = require("../model/Team");
const Notification = require("../model/Notification");
const asyncHandler = require("express-async-handler");

// Student controller methods

// Register for an event
const registerEvent = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const check = await Event.findById(eventId)
    let arr = []
    check.applicants.filter((element) => {
      if(element.user == req.body.user){
        arr.push(req.body.user)
      }
    });
    if(arr.length>0) throw new Error('Alerady Registered')

    check.applicants.push({ user: req.body.user, approved: false });
    await check.save()
    res.send(`Registered for event : ${check.name}`);
  } catch (err) {
    throw new Error(err);
  }
});

// View notifications
const viewNotifications = asyncHandler(async (req, res) => {
  try {
    // Implement logic to view notifications
    const notification = await Notification.find({ user: req.params.id });
    // Dummy response
    res.send(notification);
  } catch (err) {
    throw new Error(err);
  }
});

const viewTeams = asyncHandler(async (req, res) => {
  try {
    // Implement logic to view teams
    const team = await Team.find({})
      .populate("event")
      .populate("participants")
      .populate("captain");
    // Dummy response
    res.send(team);
  } catch (err) {
    throw new Error(err);
  }
});
const viewTeam = asyncHandler(async (req, res) => {
  try {
    // Implement logic to view teams
    const team = await Team.findById(req.params.id)
      .populate("event")
      .populate("participants")
      .populate("captain");
    // Dummy response
    res.send(team);
  } catch (err) {
    throw new Error(err);
  }
});
const byEventTeam = asyncHandler(async (req, res) => {
  try {
    // Implement logic to view teams
    const teams = await Team.find({event:req.params.id})
      .populate("event")
      .populate("participants")
      .populate("captain");
    // Dummy response
    res.send(teams);
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  registerEvent,
  viewNotifications,
  viewTeams,
  viewTeam,
  byEventTeam,
};
