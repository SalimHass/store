import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Query } from "@apollo/client/react/components";
import { Component } from "react";
import Nav from "./components/Nav";
import Products from "./components/Products";
import {
  GET_CATEGORY_Currency_LIST,
  GET_PRODUCTS_CATEGORY,
} from "./GraphQL/Queries";


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GET_CATEGORY_Currency_LIST}>
          {({ loading, error, data }) => {
            if (loading) return "loading ...";
            if (error) return { errorLink };
            let category = data.categories[0].name;
            return (
              <>
              
                <Nav key={data.categories.id} cats={data.categories}/>
                <Query query={GET_PRODUCTS_CATEGORY} variables={{ category }}>
                  {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error)
                      return `Error! ${JSON.stringify(error, null, 2)}`;
                    return (
                      
                      //Add product List component  here
                      <>
                        <div className="products--container">
                        
                        {data.category.products.map((product) => (
                          
                          <Products key={product.id} product={product}/>
                          ))}
                          </div>
                      </>
                    );
                  }}
                </Query>
              </>
            );
          }}

          

          
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
