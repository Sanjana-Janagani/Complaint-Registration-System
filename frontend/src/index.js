import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import { BrowserRouter} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    let graphqlDetailErrors = graphqlErrors.map(({ message, location, path }) => {
      return message;
    });
    console.log('graphql errors =', graphqlDetailErrors)
  }

  if (networkError) {
    console.log('network errors = ',networkError)
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5001/graphql",  credentials: 'include'}),
]);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('secretToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


