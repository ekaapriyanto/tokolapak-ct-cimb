import React from 'react';
import './ProductDetails.css';
import ButtonUI from '../../components/Button/Button';
import Axios from 'axios';
import { API_URL } from '../../../constants/API';
import { connect } from "react-redux"
import swal from "sweetalert"

class ProdactDetails extends React.Component {
    state = {
        productData: {
            image: "",
            productName: "",
            price: 0,
            desc: "",
            category: "",
            id: 0,
        }
    }

    addToCartHandler = () => {
        Axios.post(`${API_URL}/cart`, {
            userId: this.props.user.id,
            productId: this.state.productData.id,
            quantity: 1,
        })
        .then((res) => {
            console.log(res)
            swal("add to cart, succes")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount () {
        Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
        .then((res) => {
            this.setState({productData: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {productName, image, price, desc, category, id} =this.state.productData
        return (
            <div className="container">
                <div className="row py-4">
                    <div className="col-6 text-center">
                        <img
                            style={{ width: "100%", objectFit: "contain", height: "550px"}}
                            src={image}
                            alt=""
                        />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <h2>{productName}</h2>
                        <h4>
                            {
                                new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)

                            }
                        </h4>
                        <p className="mt-4">{desc}</p>
                        <div className="d-flex flex-row mt-4">
                            <ButtonUI onClick={this.addToCartHandler}>Add To Cart</ButtonUI>
                            <ButtonUI className="ml-4" type="outlined">Add To Wishlist</ButtonUI>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}

export default connect(mapStateToProps) (ProdactDetails);