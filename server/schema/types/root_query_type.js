const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const UserType = require('./user_type');
const QuestionType = require('./question_type');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Question = mongoose.model('question');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req){
        //passport adds a user to the req object if user is authenticated
        return req.user;
      }
    },
    question: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }){
        return Question.findById(id);
      }
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parentValue, args){
        return Question.find({});
      }
    }
  })
});

module.exports = RootQueryType;
