const mongoose = require('mongoose');

const Units = mongoose.model('Units', {
  serialNo: { type: String, },
  temp: { type: Number },
  humidity: { type: Number },
  co2: { type: Number },
  status: { type: String }
});

module.exports = { Units };