const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = require('./types/user_type');
const QuestionType = require('./types/question_type');
const AuthService = require('../services/auth');
const mongoose = require('mongoose');
const Question = mongoose.model('question');
const User = mongoose.model('user');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req){
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req){
        const user = req.user;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req){
        return AuthService.login({ email, password, req });
      }
    },
    createQuestion: {
      type: QuestionType,
      args: {
        prompt: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: GraphQLString },
        answer1: { type: new GraphQLNonNull(GraphQLString) },
        answer2: { type: new GraphQLNonNull(GraphQLString) },
        answer3: { type: new GraphQLNonNull(GraphQLString) },
        answer4: { type: new GraphQLNonNull(GraphQLString) },
        answer5: { type: new GraphQLNonNull(GraphQLString) },
        correct: { type: new GraphQLNonNull(GraphQLString) },
        topics: { type: new GraphQLList(GraphQLString) },
        explanation: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation }, req){
        const user = req.user;
        const userEmail = req.user.email;
        const votes = 0;
        const upVotes = 0;
        return (new Question( { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, user, explanation, user, userEmail, votes, upVotes } ).save());
      }
    }
  }
});

module.exports = mutation;
