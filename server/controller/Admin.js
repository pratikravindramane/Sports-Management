const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Feedback = require("../model/Feedback");
const Event = require("../model/Event");
const Team = require("../model/Team");
const bcrypt = require("bcrypt");
const createUser = asyncHandler(async (req, res) => {
  const { email, password, phone, name, role } = req.body;
  // if user exists
  const user = await User.findOne({ email });
  if (user) throw new Error("user already exist with this email");
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    // create new User
    const newUser = new User({
      name,
      email,
      phone,
      password: hash,
      role,
    });
    await newUser.save();
    res.send({ msg: "Successfully Registered", newUser });
  } catch (error) {
    throw new Error(error);
  }
});
const viewFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.send(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching feedback");
  }
});
const createEvent = asyncHandler(async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.send("Event created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating event");
  }
});

const viewTeacher = asyncHandler(async (req, res) => {
  try {
    const teacher = await User.find({ role: "teacher" });
    res.send(teacher);
  } catch (error) {
    throw new Error(error);
  }
});
const viewStudent = asyncHandler(async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    // const team = await Team.findOne({user:student._id})
    res.send(students);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  try {
    const user = await Event.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  createEvent,
  createUser,
  viewFeedback,
  viewTeacher,
  viewStudent,
  deleteUser,
  deleteEvent
};
