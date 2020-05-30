import React, { Component, Fragment } from "react";
import Title from "./Title";
import { ProductConsumer } from "../context";
import Product from "./Product";

class ProductList extends Component {
  render() {
    return (
      <Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map((prod) => {
                    return (
                      <Product
                        key={prod.id}
                        product={prod}
                        handleDetail={value.handleDetail}
                        addToCart={value.addToCart}
                        openModal={value.openModal}
                        closeModal={value.closeModal}
                      />
                    );
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductList;
