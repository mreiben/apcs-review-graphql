const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const QuestionSchema = new Schema({
  prompt: String,
  code: String,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  answer5: String,
  correct: String,
  topics: [String],
  explanation: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  userEmail: String,
  votes: Number,
  upVotes: Number
});

mongoose.model('question', QuestionSchema);
