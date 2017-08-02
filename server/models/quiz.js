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
  correct: Number,
  userId: String
});

// QuizSchema.statics.updateQuestion = function(id, prompt, code, correct, answer1, answer2, answer3, answer4, answer5, topics, explanation){
//   this.update(
//     { _id: id },
//     {
//       code: code,
//       correct: correct,
//       answer1: answer1,
//       answer2: answer2,
//       answer3: answer3,
//       answer4: answer4,
//       answer5: answer5,
//       topics: topics,
//       explanation: explanation,
//       prompt: prompt
//     }
//   ).then(
//     (status) => { return this.find({_id: id });}
//   )
// }

mongoose.model('quiz', QuizSchema);
