import React from "react"
import Axios from "axios";
import "./Payment.css";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Table } from "reactstrap";
import { connect } from "react-redux";

class Payment extends React.Component {
    state = {
        paymentTransaction: [],
        paymentTransactionSuccess: [],
        detailCondition: false,
        kondisi: true,
        activePage: "proggres"
    }
    getTransactionPayment = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                status: "pending",
                _embed: "transaction_details",
            }
        })
        .then((res) => {
            this.setState({paymentTransaction: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    getTransactionPaymentSucces = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                status: "success",
                _embed: "transaction_details"
            }
        })
        .then((res) => {
            this.setState({paymentTransactionSuccess: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount(){
        this.getTransactionPayment();
        this.getTransactionPaymentSucces();
    }

    comfirmBtnHandler = (id) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                            ];
    var today = new Date()
    var date = today.getDate() + '/' + monthNames[(today.getMonth())] + '/' + today.getFullYear()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = date + ' ' + time
    Axios.patch(`${API_URL}/transaction/${id}`,{
        status: "success",
        tanggalSelesai: dateTime,

    })
    .then((res) => {
        console.log(res)
        this.getTransactionPayment()
        this.getTransactionPaymentSucces()
    })
    .catch((err) => {
        console.log(err)
    })
    }

    renderPayment = () => {
        const { activePage } = this.state;
        if( activePage == "proggres") {
            return this.state.paymentTransaction.map((val, idx) => {
                const {id, userId, username, totalPrice, tanggalBelanja, tanggalSelesai, status, transaction_details } = val
                return (
                    <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{userId}</td>
                        <td>{username}</td>
                        <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice)}</td>
                        <td>{tanggalBelanja}</td>
                        <td>{tanggalSelesai}</td>
                        <td>{status}</td>
                        <td>
                            <ButtonUI type="contained" onClick={() => this.comfirmBtnHandler(id)}>Confirm!</ButtonUI>
                        </td>
                    </tr>
                    { !this.state.detailCondition ? (
                        null
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>Product Id</th>
                                    <th>Price</th>
                                    <th>total Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction_details.map((val, idx) => {
                                    return (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{val.productId}</td>
                                            <td>{val.price}</td>
                                            <td>{val.totalPrice}</td>
                                            <td>{val.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    )}
                    </>
                )
            })
        } else {
            return this.state.paymentTransactionSuccess.map((val, idx) => {
                const {id, userId, username, totalPrice, tanggalBelanja, tanggalSelesai, status, transaction_details } = val;
                return (
                    <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{userId}</td>
                        <td>{username}</td>
                        <td>{totalPrice}</td>
                        <td>{tanggalBelanja}</td>
                        <td>{tanggalSelesai}</td>
                        <td>{status}</td>
                    </tr>
                     { !this.state.detailCondition ? (
                        null
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>Product Id</th>
                                    <th>Price</th>
                                    <th>total Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction_details.map((val, idx) => {
                                    return (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{val.productId}</td>
                                            <td>{val.price}</td>
                                            <td>{val.totalPrice}</td>
                                            <td>{val.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    )}
                    </>
                )
            })
        }
    }


    render() {
        return (
            <div className="container">
                <h1>Payment</h1>
                <div className="d-flex">
                <ButtonUI 
                    className={`auth-screen-btn ${
                        this.state.activePage == "proggres"
                    }`}
                    type="outlined"
                    onClick={() => this.setState({activePage: "proggres"})}
                >Proggress</ButtonUI>
                <ButtonUI
                    className={`ml-3 auth-screen-btn ${
                        this.state.activePage == "success" ? "active" : null
                    }`}
                    type="outlined"
                    onClick={() => this.setState({activePage: "success"})}
                >Success</ButtonUI>
                <ButtonUI className="ml-3" type="outlined" onClick={() => this.setState({detailCondition:true})}>Details</ButtonUI>
                </div>
                
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Id</th>
                            <th>username</th>
                            <th>Total Price</th>
                            <th>Tanggal Belanja</th>
                            <th>tanggal Selesai</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderPayment()}</tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
  };
export default connect(mapStateToProps) (Payment);