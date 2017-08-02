const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean } = graphql;
const UserType = require('./user_type');
const QuestionType = require('./question_type');
const QuizType = require('./quiz_type');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Question = mongoose.model('question');
const Quiz = mongoose.model('quiz');

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
    },
    questionsWithTopics: {
      type: new GraphQLList(QuestionType),
      args: {
        topics: { type: new GraphQLList(GraphQLString) },
        strict: { type: GraphQLBoolean }
      },
      resolve(parentValue, {topics, strict}){
        topics = topics.sort();
        if(strict){
          return Question.find({ topics: topics });
        }
        else{
          return Question.find({ topics: { $in: topics }});
        }
      }
    },
  })
});

module.exports = RootQueryType;
