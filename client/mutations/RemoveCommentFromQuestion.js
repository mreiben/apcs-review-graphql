import gql from 'graphql-tag';

export default gql`
  mutation RemoveCommentFromQuestion($qId:ID, $comment: String){
    removeCommentFromQuestion(qId: $qId, comment: $comment){
      prompt
      comments
    }
  }
`;
