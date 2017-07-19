const graphql = require('graphql');
const UserType = require('./user_type');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const QuestionType = new GraphQLObjectType({
  name: 'QuestionType',
  fields: () =>({
    id: { type: GraphQLID },
    prompt: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString },
    answer1: { type: new GraphQLNonNull(GraphQLString) },
    answer2: { type: new GraphQLNonNull(GraphQLString) },
    answer3: { type: new GraphQLNonNull(GraphQLString) },
    answer4: { type: new GraphQLNonNull(GraphQLString) },
    answer5: { type: new GraphQLNonNull(GraphQLString) },
    correct: { type: new GraphQLNonNull(GraphQLString) },
    topics: { type: new GraphQLList(GraphQLString) },
    explanation: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: UserType }
  })
});

module.exports = QuestionType;
