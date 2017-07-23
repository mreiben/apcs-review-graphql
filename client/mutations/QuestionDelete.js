import gql from 'graphql-tag';

export default gql`
  mutation QuestionDelete($id: ID){
    deleteQuestion(id: $id){
      id
      name
      questions{
        id
        prompt
      }
    }
  }`
;
