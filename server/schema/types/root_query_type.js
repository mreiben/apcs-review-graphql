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

          badTopics = [
            "arithmetic", "data types", "boolean logic", "nested boolean logic", "memory allocation",
            "arrays", "2D arrays", "ArrayLists", "loops", "nested loops", "functions", "string methods",
            "classes", "inheritance", "interfaces", "recursive functions"
          ];

          topics.forEach((topic) =>{
            topicIndex = badTopics.indexOf(topic);
            badTopics.splice(topicIndex, 1);
          });
          return Question.find({ topics: { $nin: badTopics }})
        }
        else{
          return Question.find({ topics: { $in: topics }});
        }
      }
    },
    quizzes: {
      type: new GraphQLList(QuizType),
      resolve(parentValue, args){
        return Quiz.find({});
      }
    },
    quizById: {
      type: QuizType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }){
        return Quiz.findById(id);
      }
    }
  })
});

module.exports = RootQueryType;
