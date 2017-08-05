import gql from 'graphql-tag';

export default gql`
  mutation CreateQuizResult($prompts: [String], $codes: [String], $questionIds: [ID], $correctAnswers: [String], $userAnswers: [String], $questionTopics: [[String]], $explanations: [String], $correct: Int ){
    createQuiz(prompts: $prompts, codes: $codes, questionIds: $questionIds, correctAnswers: $correctAnswers, userAnswers: $userAnswers, questionTopics: $questionTopics, explanations: $explanations, correct: $correct ) {
      prompts
      codes
      questionIds
      correctAnswers
      userAnswers
      questionTopics
      correct
      userId
      explanations
      id
      date
    }
  }
`;
