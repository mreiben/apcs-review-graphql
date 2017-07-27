import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';
import QuestionForm from './components/QuestionForm';
import QuestionEditForm from './components/QuestionEditForm';
import QuizSetup from './components/QuizSetup';
import QuizView from './components/QuizView';
import NotFound from './components/NotFound';
import UserProfile from './components/UserProfile';
import './css/stylesheet.css';
import 'react-select/dist/react-select.css';

//allows cookies to be sent along with network requests
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

//interacts with the backend
const client = new ApolloClient({
  //identifies records from the server so Apollo can identify it
  //allows Apollo to uniquely identify each record
  dataIdFromObject: o => o.id,
  //force cookies to be sent along with any request
  networkInterface
});

const Root = () => {
  return (
    //connects the ApolloClient with React
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={LandingPage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route path="/create" component={requireAuth(QuestionForm)} />
          <Route path="/practice" component={requireAuth(QuizSetup)} />
          <Route path="/profile" component={requireAuth(UserProfile)} />
          <Route path="/edit/:id" component={requireAuth(QuestionEditForm)} />
          <Route path="/quiz/topics=:topics&number=:number&strict=:strict&style=:style" component={requireAuth(QuizView)} />
          {/* <Route path='/404' component={NotFound} />
          <Redirect from='*' to='/404' /> */}
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
