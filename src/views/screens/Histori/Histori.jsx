import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import ButtonUI from '../../components/Button/Button'

class HistoriUser extends React.Component {
    state = { 
        historiData: [],
        historiDetails: [],
        detailCondition: false,
    }

    getHistoriData = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                userId: this.props.user.id,
                status: "success"
            }
        })
        .then((res) => {
            this.setState({ historiData: res.data})
            Axios.get(`${API_URL}/trasaction_details`, {
                params: {
                    transactionId: this.props.transaction.id,
                }
            })
            .then((res) => {
                this.setState({ historiDetails: res.data})
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
        this.getHistoriData();
    }

    renderHistori = () => {
        return this.state.historiData.map((val) => {
            const {id, userId, totalPrice, status, tanggalBelanja, tanggalSelesai} = val;
            return(
                <>
                <tr>
                    <td>{id}</td>
                    <td>{userId}</td>
                    <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice)}</td>
                    <td>{tanggalBelanja}</td>
                    <td>{tanggalSelesai}</td>
                    <td>{status}</td>
                    <td>
                        <ButtonUI type="outlined">Details</ButtonUI>
                    </td>
                </tr>
                </>
            )
        })
    }

    render() {
        return (
            <div className="container py-4">
                <h1>Histori User</h1>
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