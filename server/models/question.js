const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  prompt: String,
  code: String,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  answer5: String,
  correct: String,
  topics: [String]
});

mongoose.model('question', QuestionSchema);
