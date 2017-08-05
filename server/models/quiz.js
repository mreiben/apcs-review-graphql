const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Question = require('./question');

const QuizSchema = new Schema({
  prompts: [String],
  codes: [String],
  questionIds: [String],
  correctAnswers: [String],
  userAnswers: [String],
  questionTopics: [[String]],
  explanations: [String],
  correct: Number,
  userId: String,
  date: String
});

mongoose.model('quiz', QuizSchema);
