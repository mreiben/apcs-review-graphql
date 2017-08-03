const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Question = require('./question');

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
  userName: String,
  downVoters: [String],
  upVoters: [String],
  comments: [String],
  correctAnswers: Number,
  incorrectAnswers: Number
});

QuestionSchema.statics.updateQuestion = function(id, prompt, code, correct, answer1, answer2, answer3, answer4, answer5, topics, explanation){
  this.update(
    { _id: id },
    {
      code: code,
      correct: correct,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      answer5: answer5,
      topics: topics,
      explanation: explanation,
      prompt: prompt
    }
  ).then(
    (status) => { return this.find({_id: id });}
  )
}

mongoose.model('question', QuestionSchema);
