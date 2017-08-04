import gql from 'graphql-tag';

export default gql`
  mutation AddVote($qId:ID, $vote: String){
    addVote(qId: $qId, vote: $vote){
      prompt
      upVoters
      downVoters
    }
  }
`;
