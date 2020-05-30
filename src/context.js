import React, { Component, createContext } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartTax: 0,
    cartTotal: 0,
    cartSubTotal: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  setProducts = () => {
    let products = [];
    storeProducts.forEach((item) => {
      products.push({ ...item });
    });
    this.setState({ products });
  };

  handleDetail = (id) => {
    const prod = this.getItem(id);
    this.setState(() => {
      return { detailProduct: prod };
    });
  };

  addToCart = (id) => {
    console.log(id);
    let temProducts = [...this.state.products];
    const index = temProducts.indexOf(this.getItem(id));
    const prod = temProducts[index];
    prod.inCart = true;
    prod.count = 1;
    const price = prod.price;
    prod.total = price;
    this.setState(
      () => {
        return { products: temProducts, cart: [...this.state.cart, prod] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const prod = this.getItem(id);
    this.setState(() => {
      return { modalProduct: prod, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let temCart = [...this.state.cart];
    const selectedProd = temCart.find((item) => item.id === id);
    const index = temCart.indexOf(selectedProd);
    const prod = temCart[index];
    prod.count += 1;
    prod.total = prod.count * prod.price;

    this.setState(
      () => {
        return { cart: temCart };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = (id) => {
    let temCart = [...this.state.cart];
    const selectedProd = temCart.find((item) => item.id === id);
    const index = temCart.indexOf(selectedProd);
    const prod = temCart[index];
    prod.count -= 1;
    if (prod.count === 0) {
      this.removeItem(id);
    } else {
      prod.total = prod.count * prod.price;
      this.setState(
        () => {
          return { cart: temCart };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = (id) => {
    let temProducts = [...this.state.products];
    let temCart = [...this.state.cart];
    temCart = temCart.filter((item) => item.id !== id);
    const index = temProducts.indexOf(this.getItem(id));
    const prod = temProducts[index];
    prod.inCart = false;
    prod.count = 0;
    prod.total = 0;

    this.setState(
      () => {
        return { products: [...temProducts], cart: [...temCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const temTax = 0.1 * subTotal;
    const tax = parseFloat(temTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return { cartSubTotal: subTotal, cartTax: tax, cartTotal: total };
    });
  };

  // tester = () => {
  //   console.log("state prods:", this.state.products[0].inCart);
  //   console.log("data prods:", storeProducts[0].inCart);
  //   const tempProd = [...this.state.products];
  //   tempProd[0].inCart = true;
  //   this.setState(
  //     () => {
  //       return { products: tempProd };
  //     },
  //     () => {
  //       console.log("state prods:", this.state.products[0].inCart);
  //       console.log("data prods:", storeProducts[0].inCart);
  //     }
  //   );
  // };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {/* <button onClick={this.tester}>click me</button> */}
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
