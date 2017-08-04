import gql from 'graphql-tag';

export default gql`
  mutation AddCommentToQuestion($qId:ID, $comment: String){
    addCommentToQuestion(qId: $qId, comment: $comment){
      prompt
      comments
    }
  }
`;
