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
    totalPrice: 0,
    pengiriman: 0,
  };

  inputHandler = (e, field) => {
    let { value } = e.target;
    this.setState({
      [field]: value
    });
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
          <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</td>
          <td>{quantity}</td>
          <td>
            {" "}
            <img
              src={image}
              alt=""
              style={{ width: "50px", height: "100px", objectFit: "contain" }}
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
          <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</td>
          <td>{quantity}</td>
          <td><img src={image} width="30"/></td>
          <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(quantity * price)}</td>
        </tr>
      )
    })
  }

  transactionConfirm = () => {
    const { totalPrice, cartData } = this.state
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var today = new Date()
    var date = today.getDate() + '/' + monthNames[(today.getMonth())] + '/' + today.getFullYear()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = date + ' ' + time

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
          swal("Success!", "Transaksi sukses")
          this.setState({ cartData: ''})
        })
        .catch((err) => {
          console.log(err)
        })
      })
      Axios.post(`${API_URL}/transaction`, {
        userId: this.props.user.id,
        username: this.props.user.username,
        totalPrice: totalPrice + this.state.pengiriman,
        status: "pending",
        tanggalBelanja: dateTime,
        tanggalSelesai: ""
      })
      .then((res) => {
        console.log(res.data)
        cartData.map(val => {
          Axios.post(`${API_URL}/transaction_details`, {
            productId: val.product.id,
            transactionsId: res.data.id,
            price: val.product.price,
            totalPrice: val.product.price * val.quantity,
            quantity: val.quantity
          })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        })
      })
      .catch((err) => {
        console.log(err)
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
      <div className="container">
        <h2>Cart</h2>
        {this.state.cartData.length > 0 ? (
          <>
          <Table height="10px">
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
          </Table>
          <ButtonUI onClick={this.cartTransaction}>Transaction</ButtonUI>
          {
            (!this.state.transactionCondtion) ? (null)
            : (
              <>
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
                    <td><select value={this.state.pengiriman}
                          className="custom-text-input h-100 pl-3"
                          onChange={(e) => this.inputHandler(e, "pengiriman")}>
                            <option value={0}>Economi</option>
                            <option value={100000}>Instant</option>
                            <option value={50000}>Same Day</option>
                            <option value={20000}>Express</option>
                        </select>
                      </td>
                  </tr>
                  <tr>
                    <td colSpan="5">total belanjaan anda</td>
                    <td className="text-center" colSpan="1">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(this.state.totalPrice + +this.state.pengiriman)}</td>
                  </tr>
                </tfoot>
              </Table>
              <div className="d-flex flex-column">
                <center>
                  <ButtonUI onClick={this.transactionConfirm} type="outlined">Confirm</ButtonUI>
                </center>
              </div>
              </>
            )            
          }
          </>
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