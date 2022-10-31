import React, { Component } from "react";
import { GET_PRODUCTS_CATEGORY } from "../GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import Products from "../components/Products";
import "./Category.css"
import {withRouter} from "../router/withRouter";
export class Category extends Component {
  render() {
    const category = this.props.selectedCategory;
    return (
      <Query query={GET_PRODUCTS_CATEGORY} variables={{ category }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${JSON.stringify(error, null, 2)}`;
          return (
            //Add product List component  here
            <>
              <div className="products--container">
                {data.category.products.map((product) => (
                  <Products key={product.id} product={product} />
                ))}
              </div>
              
            </>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Category);
