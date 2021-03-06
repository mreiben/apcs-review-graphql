import gql from 'graphql-tag';

export default gql`
  mutation EditQuestion($id: ID, $prompt: String, $code: String, $answer1: String, $answer2: String, $answer3: String, $answer4: String, $answer5: String, $correct: String, $topics: [String], $explanation: String){
    updateQuestion(id: $id, prompt: $prompt, code: $code, answer1: $answer1, answer2: $answer2, answer3: $answer3, answer4: $answer4, answer5:$answer5, correct: $correct, topics: $topics, explanation: $explanation){
      prompt
    }
  }
`;
