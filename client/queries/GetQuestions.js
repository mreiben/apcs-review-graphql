import gql from 'graphql-tag';

export default gql`
{
  questions {
    id
    prompt
    code
    answer1
    answer2
    answer3
    answer4
    answer5
    correct
    topics
  }
}
`;
