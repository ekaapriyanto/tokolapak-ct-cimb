import React from "react";
import { Table } from 'reactstrap'
import "../Admin/AdminDashboard.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

class AdminReport extends React.Component {
    state = {
        dataList: [],
        usernameList: [],
        productList: [],
    }

    getDataReport = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                status: "success",
                _embed: "transaction_details"
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ dataList: res.data })
                Axios.get(`${API_URL}/users`)
                    .then(res => {
                        this.setState({ usernameList: res.data })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                Axios.get(`${API_URL}/products`)
                    .then(res => {
                        this.setState({ productList: res.data })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }

    renderUserReport = () => {
        return this.state.usernameList.map((val, idx) => {
            let totalBelanja = 0
            if(val.role === "user"){
                this.state.dataList.map((val) => {
                    if (val.username == val.username) {
                        totalBelanja += val.totalPrice
                    } else {
                        totalBelanja = totalBelanja
                    }
                })
                return (
                    <>
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{val.username}</td>
                            <td>{totalBelanja}</td>
                        </tr>
                    </>
                )
            }
        })
    }
    renderProductReport = () => {
        return this.state.productList.map((val, idx) => {
            let totalQtyProduct = 0
            this.state.dataList.map(valueX => {
                valueX.transaction_details.map(valueY =>{
                    if (val.id == valueY.productId) {
                        totalQtyProduct += valueY.quantity
                    } else {
                        totalQtyProduct = totalQtyProduct
                    }
                })
            })
            return (
                <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.productName}</td>
                        <td>{totalQtyProduct}</td>
                    </tr>
                </>
            )
        })
    }

    componentDidMount() {
        this.getDataReport()
    }


    render() {
        return (
            <div className="container py-4">
                <h1>Data User</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>no</td>
                            <td>Username</td>
                            <td>Jumlah Belanja</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUserReport()}
                    </tbody>
                </Table>
                <br />
                <h1>Data product</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>no</td>
                            <td>Product Id</td>
                            <td>Jumlah Dibeli</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProductReport()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default AdminReport;