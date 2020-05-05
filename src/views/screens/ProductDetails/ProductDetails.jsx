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
    console.log(this.props.user.id);
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        productId: this.state.productData.id,
      // quantity:  1,
      }
    })
      .then((res) => {
        if(res.data.length == 0){
          Axios.post(`${API_URL}/carts`, {
          userId: this.props.user.id,
          productId: this.state.productData.id,
          quantity:  1,
          
        })
        .then((res) => {
          console.log(res.data);
          swal("Add to cart", "Your item has been added to your cart", "success");
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        Axios.patch(`${API_URL}/carts/${res.data[0].id}`,{
          quantity: res.data[0].quantity + 1
        })
        .then((res) => {
          console.log(res);
          swal("Add to cart", "Your item has been added to your cart", "success");
        })
        .catch((err) => {
          console.log(err)
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  addToWishlistHandler = () => {
    console.log(this.props.user.id, this.state.productData.id)
    Axios.get(`${API_URL}/wishlist`, {
      params: {
        userId: this.props.user.id,
        productId: this.state.productData.id,
      }
    })
    .then((res) => {
      console.log(res.data)
      if(res.data.length == 0){
        Axios.post(`${API_URL}/wishlist`, {
          userId: this.props.user.id,
          productId: this.state.productData.id,
        })
        .then((res) => {
          console.log(res.data)
          swal("Add to wishlist")
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        swal("Sudah ada di daftar wishlist")
      }
      })
      .catch((err) => {
        console.log(err)
      })
    }

  componentDidMount() {
    Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
      .then((res) => {
        this.setState({ productData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
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
                            <ButtonUI onClick={this.addToWishlistHandler} className="ml-4" type="outlined">Add To Wishlist</ButtonUI>
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
