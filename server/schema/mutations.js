const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} = graphql;

const UserType = require('./types/user_type');
const QuestionType = require('./types/question_type');
const AuthService = require('../services/auth');
const mongoose = require('mongoose');
const Question = mongoose.model('question');

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
        prompt: { type: GraphQLString },
        code: { type: GraphQLString },
        answer1: { type: GraphQLString },
        answer2: { type: GraphQLString },
        answer3: { type: GraphQLString },
        answer4: { type: GraphQLString },
        answer5: { type: GraphQLString },
        correct: { type: GraphQLString },
        topics: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parentValue, { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics }){
        return (new Question( { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics } ).save());
      }
    }
  }
});

module.exports = mutation;
