const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const QuestionType = require('./question_type');
const mongoose = require('mongoose');
const User = mongoose.model('user');

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
    }
  })
});

module.exports = UserType;
