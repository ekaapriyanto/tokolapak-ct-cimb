import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import swal from 'sweetalert'
import { Table } from 'reactstrap'
import ButtonUI from '../../components/Button/Button'
import { connect } from 'react-redux'

class Wishlist extends React.Component {
    state = {
        wishlistData: [],
    }

    getWishlistData = () => {
        Axios.get(`${API_URL}/wishlist`, {
            params: {
                userId: this.props.user.id,
                _expand: "product",
            }
        })
        .then((res) => {
            this.setState({ wishlistData: res.data });
            // console.log(this.state.wishlistData);
        })
        .catch((err) => {
            swal("error")
            console.log(err);
        })
    }

    addToCartHandler = (id,idx) => {
        console.log(this.state.wishlistData[idx])
        // console.log(this.state.wishlistData.userId,this.state.wishlistData.productId);
        Axios.get(`${API_URL}/carts/`, {
          params: {
            userId: this.state.wishlistData[idx].userId,
            productId: this.state.wishlistData[idx].productId,
          }
        })
        .then((res)=>{
            // console.log(res.data)
            if (res.data.length==0) {
                Axios.post(`${API_URL}/carts`, {
                    userId: this.state.wishlistData[idx].userId,
                    productId: this.state.wishlistData[idx].productId,
                    quantity:  1,
                })
                .then((res) => {
                    console.log(res.data)   
                    this.deleteWishlistHandler(id)
                    swal("Added To Cart")
                })
            } else {
                Axios.patch(`${API_URL}/carts/${res.data[0].id}`,{
                    quantity: res.data[0].quantity + 1
                })
                .then((res) => {
                    console.log(res.data)
                    this.deleteWishlistHandler(id)
                    swal("Added To Cart")
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    deleteWishlistHandler = (id) => {
        Axios.delete(`${API_URL}/wishlist/${id}`)
          .then((res) => {
            this.getWishlistData();
          })
          .catch((err) => {
            console.log(err);
          });
      };

    renderWishlistData = () => {
        return this.state.wishlistData.map((val, idx) => {
          const { product, id } = val;
          const { productName, image, price } = product;
          return (
            <tr>
              <td>{idx + 1}</td>
              <td>{productName}</td>
              <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</td>
              <td>
                {" "}
                <img
                  src={image}
                  alt=""
                  style={{ width: "50px", height: "100px", objectFit: "contain" }}
                />{" "}
              </td>
              <td>
                <div>
                  <ButtonUI
                    type="outlined"
                    onClick={() => this.addToCartHandler(id,idx)}
                  >
                    Add To Cart
                  </ButtonUI>
                  <ButtonUI
                    className="mt-2"
                    type="contained"
                    onClick={() => this.deleteWishlistHandler(id)}
                  >
                    Delete Items
                  </ButtonUI>
                </div>
              </td>
            </tr>
          );
        });
      };

    componentDidMount() {
        this.getWishlistData();
    }

    render() {
      return (
        <div className="container py-4">
          <h2>Wishlist</h2>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
            <tbody>{this.renderWishlistData()}</tbody>
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

export default connect(mapStateToProps) (Wishlist);