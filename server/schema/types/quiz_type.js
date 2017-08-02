const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = graphql;

const QuizType = new GraphQLObjectType({
  name: 'QuizType',
  fields: () =>({
    id: { type: GraphQLID },
    prompts: { type: new GraphQLList(GraphQLString) },
    codes: { type: new GraphQLList(GraphQLString) },
    questionIds: { type: new GraphQLList(GraphQLID) },
    correctAnswers: { type: new GraphQLList(GraphQLString) },
    userAnswers: { type: new GraphQLList(GraphQLString) },
    explanations: { type: new GraphQLList(GraphQLString) },
    questionTopics: { type: new GraphQLList(new GraphQLList(GraphQLString)) },
    correct: { type: GraphQLInt },
    userId: { type: GraphQLID }
  })
});

module.exports = QuizType;
