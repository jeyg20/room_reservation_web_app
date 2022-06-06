const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: {type: String, required:false},
  startDate: {type: String, required:false},
  endDate: {type: String, required:false},
  breakfast: {type: String, required:false},
  amenities: {type: Boolean, required:false},
});
module.exports = mongoose.model('Post',postSchema);
