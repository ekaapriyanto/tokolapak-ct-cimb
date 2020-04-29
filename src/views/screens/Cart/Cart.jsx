import React from 'react'
import { connect } from "react-redux"
import "./Cart.css"
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import ButtonUI from '../../components/Button/Button';
import swal from 'sweetalert'

class Cart extends React.Component {

    state = {
        productInCart: []
    }
    
    deleteToCartHandler = (index) => {
        Axios.delete(`${API_URL}/cart/${index}`, {
            userId: this.props.user.id,
            productId: this.state.productCart,
            quantity: 1,
        })
        .then((res) => {
            console.log(res)
            swal("berhasil di hapus")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount () {
        Axios.get(`${API_URL}/cart`, {
            params:{
                userId: this.props.user.id,
                _expand: "product",
            }
        })
        .then((res) => {
            console.log(res.data);
            this.setState({productInCart: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    renderCart = () => {
        return this.state.productInCart.map((val) => {
            return (
                <div className="container cart d-inline-block">
                <div className="row">
                    <div className="col-2 text-center">
                        <img src={val.product.image} width="100px"/>
                    </div>
                    <div className="col-8">
                        <h5>{val.product.productName}</h5>
                        <h5>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val.product.price)}</h5>
                        <h5>{val.product.category}</h5>
                    </div>
                    <div className="col-2">
                    <ButtonUI className="ml-4" type="contained">Delete</ButtonUI>
                    </div>
                </div>
            </div>
            )
        })
    }
    componentDidUpdate(){
        {this.renderCart()}
    }
    render() {
        // const {image, productName, price, category, id} = this.state.productCart
        return(
            <div>
                {this.renderCart()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps) (Cart);