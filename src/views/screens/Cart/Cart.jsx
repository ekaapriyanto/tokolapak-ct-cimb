import React from 'react'
import { connect } from "react-redux"
import "./Cart.css"
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import ButtonUI from '../../components/Button/Button';
import swal from 'sweetalert'
import { Table } from 'reactstrap'
import {Link} from "react-router-dom"
import {Alert} from "react-router-dom"


class Cart extends React.Component {

    state = {
        cartData: []
    }

    renderCart = () => {
        return this.state.cartData.map((val, idx) => {
            const {quantity, product} = val
            const {productName, image, price, id} = product
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>
                        {""}
                        <img src={image} alt=""
                        style={{width: "100px", height: "200px", objectFit: "contain"}}/>
                    </td>
                    <td>{productName}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>
                        <ButtonUI type="contained" onClick={() => this.deleteToCartHandler }>
                            Delete
                        </ButtonUI>
                    </td>
                </tr>

            //     <div className="container cart d-inline-block">
            //     <div className="row">
            //         <div className="col-2 text-center">
            //             <img src={val.product.image} width="100px"/>
            //         </div>
            //         <div className="col-8">
            //             <h5>{val.product.productName}</h5>
            //             <h5>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val.product.price)}</h5>
            //             <h5>{val.product.category}</h5>
            //         </div>
            //         <div className="col-2">
            //         <ButtonUI className="ml-4" type="contained">Delete</ButtonUI>
            //         </div>
            //     </div>
            // </div>
            )
        })
    }

    getCartData = () => {
        

        Axios.get(`${API_URL}/carts`, {
            params:{
                userId: this.props.user.id,
                _expand: "product",
            }
        })
        .then((res) => {
            console.log(res.data);
            this.setState({cartData: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    deleteToCartHandler = (id) => {
        Axios.delete(`${API_URL}/cart/${id}`)
        .then((res) => {
            console.log(res)
            this.getCartData();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount () {
        this.getCartData();
    }

    render() {
        // const {image, productName, price, category, id} = this.state.productCart
        return(
            <div className="container">
                {
                    this.state.cartData.length > 0 ? (
                        <Table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Image</td>
                            <td>Nama product</td>
                            <td>price</td>
                            <td>quantity</td>
                            <td>action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                </Table>
                    ) : (
                        <div>
                            Your Cart is empety! <Link to="/">Go to Shopping</Link>
                        </div>
                    )
                }
                <div>Cart</div>
                
            </div>
            // <div>
            //     {this.renderCart()}
            // </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps) (Cart);