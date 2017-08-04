import gql from 'graphql-tag';

export default gql`
  query($topics: [String], $strict: Boolean){
    questionsWithTopics(topics: $topics, strict: $strict){
      id
      prompt
      code
      topics
      correct
      answer1
      answer2
      answer3
      answer4
      answer5
      explanation
      upVoters
      downVoters
      correctAnswers
      incorrectAnswers
    }
  }
`;
