import gql from 'graphql-tag';

export default gql`
{
  questions{
    id
    topics
    userName
    upVoters
    downVoters
    lastUpdate
  }
}
`;
