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
import Category from "./components/Category";
import Product from "./components/Product";
import { GET_CATEGORY_Currency_LIST } from "./GraphQL/Queries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";

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
  constructor(props) {
    super(props);

    this.state = { selectedCategoryIndex: 0 };
    this.handler = this.handler.bind(this);
  }

  handler(index) {
    this.setState({
      selectedCategoryIndex: index,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Query query={GET_CATEGORY_Currency_LIST}>
            {({ loading, error, data }) => {
              if (loading) return "loading ...";
              if (error) return { errorLink };
              let category =
                data.categories[this.state.selectedCategoryIndex].name;
              return (
                <div className="hero">
                  <Nav
                    key={"nav"}
                    cats={data}
                    onCategoryChanged={this.handler}
                    selectedCategoryIndex={this.state.selectedCategoryIndex}
                  />
                  <Routes>
                    <Route
                      path="/"
                      element={<Category selectedCategory={category} />}
                    />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                  </Routes>
                </div>
              );
            }}
          </Query>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
