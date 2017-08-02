const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'question'
  }]
});

UserSchema.statics.addQuestionToUser = function(user_id, question){
  const Question = mongoose.model('question');
  return (this.findById(user_id)
  .then( (user) => {
    user.questions.push(question)
    return user.save();
  })
);
}

UserSchema.statics.removeQuestionFromUser = function(user_id, question_id){
  return (this.findById(user_id)
  .then((user) => {
    let qIndex = user.questions.map(function(item){ return item.id; }).indexOf(question_id);
    user.questions.splice(qIndex, 1);
    return user.save();
  })
)
}

UserSchema.statics.findQuestions = function(id) {
  return this.findById(id)
  .populate('questions')
  .then(user => user.questions);
}

UserSchema.statics.addQuizToUser = function(user_id, quiz){
  const Quiz = mongoose.model('quiz');
  return (this.findById(user_id)
    .then( (user) =>{
      user.quizzes.push(quiz)
      return user.save();
    })
  )
}

UserSchema.statics.findQuizzes = function(id){
  return this.findById(id)
  .populate('quizzes')
  .then(user => user.quizzes);
}

UserSchema.statics.removeQuizFromUser = function(user_id, quiz_id){
  return (this.findById(user_id)
  .then( (user) => {
      let qIndex = user.quizzes.map(function(item){ return item.id; }).indexOf(quiz_id);
      user.quizzes.splice(qIndex, 1);
      return user.save();
    })
  )
}

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

mongoose.model('user', UserSchema);
