const mongoose = require("mongoose");
const crewSchema = new mongoose.Schema({
    name: String,
    role: String,
    active: Boolean
});

module.exports = mongoose.model("Crews", crewSchema)