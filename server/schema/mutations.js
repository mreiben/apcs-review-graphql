const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt
} = graphql;

const UserType = require('./types/user_type');
const QuestionType = require('./types/question_type');
const QuizType = require('./types/quiz_type');
const AuthService = require('../services/auth');
const mongoose = require('mongoose');
const Question = mongoose.model('question');
const User = mongoose.model('user');
const Quiz = mongoose.model('quiz');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { email, password, name }, req){
        return AuthService.signup({ email, password, name, req });
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
    createQuiz: {
      type: QuizType,
      args: {
        prompts: { type: new GraphQLList(GraphQLString) },
        codes: { type: new GraphQLList(GraphQLString) },
        questionIds: { type: new GraphQLList(GraphQLID) },
        correctAnswers: { type: new GraphQLList(GraphQLString) },
        userAnswers: { type: new GraphQLList(GraphQLString) },
        explanations: { type: new GraphQLList(GraphQLString) },
        questionTopics: { type: new GraphQLList(new GraphQLList(GraphQLString)) },
        correct: { type: GraphQLInt }
      },
      resolve(parentValue, { prompts, codes, questionIds, userAnswers, correctAnswers, explanations, questionTopics, correct }, req){
        const userId = req.user.id;
        return( new Quiz( { prompts, codes, questionIds, userAnswers, correctAnswers, explanations, questionTopics, correct, userId }) ).save()
        .then((q) =>{
          User.addQuizToUser(userId, q);
          return q;
        });
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
        const userName = req.user.name;
        const votes = 0;
        const upVotes = 0;
        const correctAnswers = 0;
        const incorrectAnswers = 0;
        return (new Question( { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation, userName, votes, upVotes, correctAnswers, incorrectAnswers } ).save()
      .then((q) => {
        User.addQuestionToUser(req.user.id, q);
          })
        );
      }
    },
    deleteQuestion: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }, req) {
        User.removeQuestionFromUser(req.user.id, id)
          .then((u) => {
            Question.remove({ _id: id })
              .then((q) =>{
                return req.user;
              })
          })
      }
    },
    updateQuestion: {
      type: QuestionType,
      args: {
        id: { type: GraphQLID },
        prompt: { type: GraphQLString },
        code: { type: GraphQLString },
        answer1: { type: GraphQLString },
        answer2: { type: GraphQLString },
        answer3: { type: GraphQLString },
        answer4: { type: GraphQLString },
        answer5: { type: GraphQLString },
        correct: { type: GraphQLString },
        topics: { type: new GraphQLList(GraphQLString) },
        explanation: { type: GraphQLString }
      },
      resolve(parentValue, { id, prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation }, req){
        return Question.updateQuestion( id, prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation )
      }
    }
  }
});

module.exports = mutation;
