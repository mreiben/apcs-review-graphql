import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './components/App';

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

        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
