const asyncHandler = require("express-async-handler");
const Event = require("../model/Event");
const Team = require("../model/Team");
const viewStudents = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error);
  }
});
const createTeam = asyncHandler(async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.send(team);
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
});
const updateResults = asyncHandler(async (req, res) => {

  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { ...req.body });
    if(!event) throw new Error('No Event With This ID')
    res.send(event);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createTeam, viewStudents, updateResults };
