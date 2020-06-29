const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  league: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)
// ,
// owner: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User',
//   required: true
// }
