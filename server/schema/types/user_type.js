const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const QuestionType = require('./question_type');
const QuizType = require('./quiz_type');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Quiz = mongoose.model('quiz');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    email: {
      type: GraphQLString,
      resolve: function(user){
        return user.email;
      }
    },
    id: {
      type: GraphQLID,
      resolve: function(user){
        return user.id;
      }
    },
    name: {
      type: GraphQLString,
      resolve: function(user){
        return user.name;
      }
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parentValue){
        return User.findQuestions(parentValue.id);
      }
    },
    quizzes: {
      type: new GraphQLList(QuizType),
      resolve(parentValue){
        return User.findQuizzes(parentValue.id);
      }
    }
  })
});

module.exports = UserType;
