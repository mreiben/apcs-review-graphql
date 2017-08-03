import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuizById';
import { Preloader } from 'react-materialize';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import _ from 'lodash';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class QuizResults extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  renderQuestion(i){
    let quiz = this.props.data.quizById;
    let prompt = quiz.prompts[i];
    let userAnswer = quiz.userAnswers[i];
    let correct = quiz.correctAnswers[i];
    let code = quiz.codes[i];
    let explanation = quiz.explanations[i];
    let topics = quiz.questionTopics[i].join(", ");
    let header = `Question ${i + 1} - Topics: ${topics}`;
    let wasCorrect = userAnswer == correct;
    let icon = wasCorrect ? "check" : "clear";

    return(
      <CollapsibleItem header={header} icon={icon} key={i}>
        <div className="collection">
          <Collapsible className="sub-collapse">
            <CollapsibleItem header="Prompt" icon="live_help">
              <div className="collection-item"><ReactMarkdown source={prompt} /></div>
            </CollapsibleItem>
            <CollapsibleItem header="Code" icon="code">
              <div className="collection-item"><code className="code">{code}</code></div>
            </CollapsibleItem>
            <CollapsibleItem header="Explanation" icon="lightbulb_outline">
              <div className="collection-item"><ReactMarkdown source={explanation} /></div>
            </CollapsibleItem>
          </Collapsible>
          <div className="collection-item"><span className="resultCat">Correct Answer: </span><ReactMarkdown source={correct} /></div>
          <div className="collection-item"><span className="resultCat">Your Answer: </span><ReactMarkdown source={userAnswer} /></div>
        </div>
      </CollapsibleItem>
    )
  }

  renderQuestions(){
    let indexArr = _.range(0, this.props.data.quizById.prompts.length);
    return indexArr.map((i) => {return this.renderQuestion(i)});
  }

  getData(){
    let topics = {};
    let questions = this.props.data.quizById;
    for(let i = 0; i < questions.correctAnswers.length; i++){
      let qTopics = questions.questionTopics[i];
      for(let t = 0; t < qTopics.length; t++){
        let key = qTopics[t];
        if (!topics[key]){
          topics[key] = {"count": 0, "correct": 0};
        }
        let tCount = topics[key].count;
        let tCorrect = topics[key].correct;
        if(questions.userAnswers[i] == questions.correctAnswers[i]){
          topics[key] = {"count": tCount + 1, "correct": tCorrect + 1 }
        }
        else {
          topics[key] = {"count": tCount + 1, "correct": tCorrect }
        }
      }
    }

    let topicsArr = [];
    Object.keys(topics).forEach(function(entry){
      let obj = {};
      let key = entry;
      let kCount = topics[key].count;
      let kCorrect = topics[key].correct;
      kCount = kCount - kCorrect;
      obj= {topic: key, incorrect: kCount, correct: kCorrect};
      topicsArr.push(obj);
    });
    return topicsArr;
  }

  render(){
    if(!this.props.data.quizById){
      return <Preloader size='big' />
    }
    else{
      const data = this.getData();
      let quiz = this.props.data.quizById;

      const YAxisLabel = ({ axisType, x=0, y=0, width, height, stroke, children }) => {
        const isVert = axisType === 'yAxis';
        const cx = isVert ? x : x + (width / 2);
        const cy = isVert ? (height / 2) + y : y + height + 10;
        const rot = isVert ? `270 ${cx} ${cy}` : 0;
        return (
          <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
            {children}
          </text>
        );
      };

      const CustomizedXAxisTick = ({x, y, stroke, payload}) =>{
       	return (
        	<g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
          </g>
        );
      };

      return(
        <div>
          <div className="section">
            <Link to="/dashboard" className="btn dashboard-btn  btn-special z-depth-0">Back</Link>
          </div>
          <h3>Quiz Results:</h3>
          <BarChart width={700} height={500} data={data}
            margin={{top: 20, right: 30, left: 30, bottom: 75}}>
            <XAxis dataKey="topic" tick={<CustomizedXAxisTick/>} interval={0}/>
            <YAxis allowDecimals={false} label={<YAxisLabel axisType="yAxis" x={25} y={200} width={0} height={0}>Number of Questions</YAxisLabel>}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Legend verticalAlign="top"/>
            <Bar dataKey="correct" stackId="a" fill="#1e88e5" maxBarSize={60}/>
            <Bar dataKey="incorrect" stackId="a" fill="#f44336" maxBarSize={60}/>
          </BarChart>
          <div className="section">
            <h4>Total Questions: {quiz.userAnswers.length}</h4>
          </div>
          <Collapsible>{this.renderQuestions()}</Collapsible>
        </div>
      );
    }
  }
}

export default graphql(query, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(QuizResults);
