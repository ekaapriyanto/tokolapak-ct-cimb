import React from 'react'
import { connect } from "react-redux"
import "./Cart.css"
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import ButtonUI from '../../components/Button/Button';
import swal from 'sweetalert'
// import { Table } from 'reactstrap'
import {Link} from "react-router-dom"
// import {Alert} from "react-router-dom"
import TextField from "../../components/TextField/TextField"

import { Table, Alert } from "reactstrap";

class Cart extends React.Component {
  state = {
    cartData: [],
    checkOutData: [],
    transactionCondtion: false,
    totalPrice: 0
  };

  getCartData = () => {
    let totalHarga = 0
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ cartData: res.data });
        this.state.cartData.map((val) => {
          totalHarga += val.quantity * val.product.price
        })
        this.setState({totalPrice: totalHarga})
      })
      .catch((err) => {
        swal("Error")
        console.log(err);
      });
  };

  renderCartData = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>
            {" "}
            <img
              src={image}
              alt=""
              style={{ width: "100px", height: "200px", objectFit: "contain" }}
            />{" "}
          </td>
          <td>
            <ButtonUI
              type="outlined"
              onClick={() => this.deleteCartHandler(id)}
            >
              Delete Item
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  deleteCartHandler = (id) => {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  cartTransaction = () => {
    this.setState({ transactionCondtion: true })
  }
  renderTransaction = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val
      const { productName, price, image } = product
      return (
        <tr key={`cartData-${id}`}>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td><img src={image} width="80" /></td>
          <td>{quantity * price}</td>
        </tr>
      )
    })
  }

  transactionConfirm = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
    .then((res) => {
      console.log(res.data)
      res.data.map((val) => {
        this.setState({ checkOutData: [...this.state.checkOutData, val.product]})
        Axios.delete(`${API_URL}/carts/${val.id}`)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      })
      Axios.post(`${API_URL}/transaction`, {
        userId: this.props.user.id,
        totalPrice: this.state.totalPrice,
        status: "pending",
        items: this.state.checkOutData,
      })
      .then((res) => {
        console.log(res.data)
        swal("Success!", "Silahkan ke menu payment untuk membayar")
        this.setState({ cartData: ''})
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getCartData();
  }

  render() {
    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderCartData()}</tbody>
            <div className="container">
              <ButtonUI onClick={this.cartTransaction}>Transaction</ButtonUI>
              {
                (!this.state.transactionCondtion) ? (null)
                : (
                  <>
                  <div className="container py-4">
                  <h3>Total belanjaan</h3>
                  <Table className="mt-10">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderTransaction()}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="5">total belanjaan anda</td>
                            <td colSpan="1">{this.state.totalPrice}</td>
                          </tr>
                        </tfoot>
                  </Table>
                  </div>
                  <div className="d-flex flex-column">
                  <center>
                    <ButtonUI onClick={this.transactionConfirm} type="outlined">Confirm</ButtonUI>
                  </center>
                </div>
                </>
                )
              }
            </div>
          </Table>
        ) : (
          <Alert>
            Your cart is empty! <Link to="/">Go shopping</Link>
          </Alert>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps) (Cart);