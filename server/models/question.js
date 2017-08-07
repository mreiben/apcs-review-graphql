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
  incorrectAnswers: Number,
  lastUpdate: String
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
      prompt: prompt,
      upVoters: [],
      downVoters: []
    }
  ).then(
    (status) => { return this.find({_id: id });}
  )
}

QuestionSchema.statics.addVote = function(qId, userId, vote){
  return (this.find({_id: qId})
    .then((question)=>{
      let upVoters = question[0].upVoters;
      let downVoters = question[0].downVoters;
      if (upVoters.indexOf(userId) != -1){ upVoters.splice(upVoters.indexOf(userId), 1); }
      if (downVoters.indexOf(userId) != -1){ downVoters.splice(downVoters.indexOf(userId), 1); }
      if(vote == "up"){
        upVoters.push(userId);
      }
      else{
        downVoters.push(userId);
      }

      this.update(
        { _id: qId },
        {
          upVoters: upVoters,
          downVoters: downVoters
        }
      ).then(
        (status) => { return this.find({_id: qId }); }
      )
    })
  )
}

QuestionSchema.statics.addCommentToQuestion = function(qId, comment){
  return (this.find({_id: qId}))
    .then((question) => {
      let comments = question[0].comments;
      comments.push(comment);

      this.update(
        {_id: qId},
        {
          comments: comments
        }
      ).then(
        (status) => { return this.find({_id: qId }); }
      )
    })
}

QuestionSchema.statics.removeCommentFromQuestion = function(qId, comment){
  return (this.find({_id: qId}))
    .then((question) => {
      let comments = question[0].comments;
      let commentIndex = comments.indexOf(comment);
      let newComments = comments.splice(commentIndex, commentIndex + 1);
      this.update(
        {_id: qId},
        {
          comments: newComments
        }
      ).then(
        (status) => { return this.find({_id: qId }); }
      )
    })
}

mongoose.model('question', QuestionSchema);
