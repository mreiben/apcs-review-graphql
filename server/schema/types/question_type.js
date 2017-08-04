const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
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
    userName: { type: GraphQLString },
    downVoters: { type: new GraphQLList(GraphQLID) },
    upVoters: { type: new GraphQLList(GraphQLID) },
    comments: { type: new GraphQLList(GraphQLString) },
    correctAnswers: { type: GraphQLInt },
    incorrectAnswers: { type: GraphQLInt },
    lastUpdate: { type: GraphQLString }
  })
});

module.exports = QuestionType;
