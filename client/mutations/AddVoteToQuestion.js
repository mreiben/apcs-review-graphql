import gql from 'graphql-tag';

export default gql`
  mutation($qId:ID, $vote: String){
    addVote(qId: $qId, vote: $vote){
      prompt
      upVoters
      downVoters
    }
  }
`;
