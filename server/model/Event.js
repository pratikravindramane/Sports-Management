const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  date: { type: String, require: true },
  time: { type: String, require: true },
  venue: { type: String, require: true },
  teams: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  numberOfParticipants: { type: Number },
  applicants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      approved: { type: Boolean},
    },
  ],
  winners: {
    first: { type: Schema.Types.ObjectId, ref: "Team" },
    second: { type: Schema.Types.ObjectId, ref: "Team" },
    third: { type: Schema.Types.ObjectId, ref: "Team" },
  },
});
module.exports = mongoose.model("Event", EventSchema);
