import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { Component } from "react";
import Nav from "./components/Nav"

import GetData from "./components/GetData";


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class App extends Component {
  
  render(){

    return (
      
    <ApolloProvider client={client}>
      <Nav />
     <h1>Salim hassouneh asdasdasdaaaas </h1>
     <GetData/>

    </ApolloProvider>
  );
}
}

export default App