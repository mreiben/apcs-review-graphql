const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

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
    }
  })
});

module.exports = UserType;
