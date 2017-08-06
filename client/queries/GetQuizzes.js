import gql from 'graphql-tag';

export default gql`
{
  quizzes{
    id
    correct
    correctAnswers
  }
}
`;
