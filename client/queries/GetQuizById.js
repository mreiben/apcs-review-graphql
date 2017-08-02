import gql from 'graphql-tag';

export default gql`
  query($id: ID){
    quizById(id:$id){
      id
      prompts
      codes
      questionIds
      correctAnswers
      userAnswers
      questionTopics
      correct
      userId
    }
  }
`;
