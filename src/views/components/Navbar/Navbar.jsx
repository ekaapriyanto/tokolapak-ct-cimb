import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button.tsx";
import Profil from "../../../assets/images/user1.png"
import Logo from "../../../assets/images/LogoBrand.png";
import {logoutHandler} from "../../../redux/actions";
import { onChangeTodo } from "../../../redux/actions";
import Cookie from "universal-cookie"
import Axios from "axios";
import { API_URL } from "../../../constants/API";

const cookiesObject = new Cookie()

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
    cartData: [],
    totalQty: 0,
  };

  logOut = () => {
    this.props.logoutHandler()
    cookiesObject.remove("authData")
  }

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  logoutBtnHandler = () => {
    this.props.onLogout();
    // this.forceUpdate();
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  cartQty = () => {
    let qty = 0
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      }
    })
    .then((res) => {
      console.log(res)
      this.setState({ cartData: res.data });
      this.state.cartData.map((val) => {
        qty += val.quantity
      })
      this.setState({totalQty: qty})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount(){
    this.cartQty();
  }

  render() {
    
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container" style={{backgroundColor:"white"}}>
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <img src={Logo} width="150px"/>
          </Link>
        </div>
        <div
          style={{ flex: 1 }}
          className="px-5 d-flex flex-row justify-content-start"
        >
          <input
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={(e) => this.props.onChangeTodo(e.target.value)}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
            }`}
            type="text"
            placeholder="Cari produk impianmu disini"
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          {
          this.props.user.id ? (
            <>
              <Dropdown
                toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}
              >
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                  <p className="small ml-3 mr-4">{this.props.user.username}</p>
                </DropdownToggle>
                <DropdownMenu className="mt-2">
                {
                  this.props.user.role === "admin" ? (
                    <>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/dashboard"
                      >
                        Dashboard
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                    <Link style={{ color: "inherit", tex: "none"}} to="/admin/member">
                        member
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link style={{ color: "inherit", tex: "none"}} to="/admin/payment">
                        Payment
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link style={{ color: "inherit", tex: "none"}} to="/admin/report">
                        Report
                      </Link>
                    </DropdownItem>
                    </>
                  ) : (
                    <>
                    <DropdownItem>
                      <Link to="/histori" style={{ color: "inherit", tex: "none"}}>Histori</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/wishlist" style={{ color: "inherit", tex: "none"}}>Wishlist</Link>
                    </DropdownItem>
                    </>
                  )
                }
                </DropdownMenu>
              </Dropdown>
              {
                this.props.user.role === "admin" ? (
                  <>
                  <ButtonUI type="ml-4" type="textual" onClick={this.logoutBtnHandler}>
                    <Link to="/auth">Logout</Link>
                  </ButtonUI>
                  </>
                ) : (
                  <>
                  <Link
                    className="d-flex flex-row"
                    to="/cart"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faShoppingCart}
                      style={{ fontSize: 24 }}
                    />
                    <CircleBg>
                      <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                        {this.state.totalQty}
                      </small>
                    </CircleBg>
                  </Link>
                  <ButtonUI
                    onClick={this.logoutBtnHandler}
                    className="ml-3"
                    type="textual"
                  >
                    <Link to="/auth" style={{textDecoration: "none"}}>Logout</Link>
                  </ButtonUI>
                  </>
                )
              }
              </>
          ) : (
            <>
              <ButtonUI className="mr-3" type="textual">
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/auth">
                  Sign in
                </Link>
              </ButtonUI>
              <Link to="/auth" style={{ textDecoration: "none"}}>
                <ButtonUI type="contained">Sign up</ButtonUI>
              </Link>
              </>
            )
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}
const mapDispatchToProps = {
  onLogout: logoutHandler,
  onChangeTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
