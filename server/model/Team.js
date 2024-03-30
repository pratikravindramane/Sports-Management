const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  // versers: [{
  //   opponent: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Team",
  //   },
  //   rounde: {
  //     type: Number,
  //   },
  //   win: { type: Boolean },
  //   date:{type:String},
  //   time:{type:String},
  // }],
  price: { type: String, Default: "praticipant" },
});

//Export the model
module.exports = mongoose.model("Team", TeamSchema);
