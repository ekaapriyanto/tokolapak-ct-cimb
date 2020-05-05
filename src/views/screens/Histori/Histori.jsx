import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import ButtonUI from '../../components/Button/Button'

class HistoriUser extends React.Component {
    state = { 
        historiData: [],
        detailCondition: false,
        kondisi: true,
        transactionId: "",
    }

    getHistoriData = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                userId: this.props.user.id,
                status: "success",
                _embed: "transaction_details",
            }
        })
        .then((res) => {
            this.setState({ historiData: res.data})
            console.log(this.state.historiData)
        })
        .catch((err) => {
            console.log(err)
        })
        console.log(this.state.historiData)
    }

    renderHistori = () => {
        return this.state.historiData.map((val) => {
            const {id, username, totalPrice, status, tanggalBelanja, tanggalSelesai, transaction_details} = val;
            return(
                <>
                <tr>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice)}</td>
                    <td>{tanggalBelanja}</td>
                    <td>{tanggalSelesai}</td>
                    <td>{status}</td>
                </tr>
                        { !this.state.detailCondition ? (
                            <ButtonUI type="outlined" onClick={() => this.setState({detailCondition:true})}>Details</ButtonUI>
                        ) : (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>Product Id</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
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

    componentDidMount() {
        this.getHistoriData();
    }

    render() {
        return (
            <div className="container py-4">
                <h1>Histori User</h1>
                { this. state.kondisi ? (
                    <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User Id</th>
                                <th>Total Price</th>
                                <th>tanggal Belanja</th>
                                <th>tanggal Selesai</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderHistori()}</tbody>
                    </Table>
                    </>
                ) : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps) (HistoriUser);