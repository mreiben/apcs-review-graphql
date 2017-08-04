import gql from 'graphql-tag';

export default gql`
  query currentUser{
    user {
      id
      email
      name
      questions{
        id
      }
      quizzes{
        id
      }
    }
  }
`;
