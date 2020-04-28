import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import Cookie from "universal-cookie";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {logoutHandler} from "../../../redux/actions"
import ButtonUI from "../Button/Button.tsx";
import Logo from "../../../assets/images/LogoBrand.png";
import user1 from "../../../assets/images/user1.png";

const cookiesObject = new Cookie();

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  logout = () => {
    this.props.logoutHandler()
    cookiesObject.remove("authData")
  }

  render() {
    let logo = Logo;
    let userFoto = user1
    if (!this.props.user.id){
      return (
        <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
          <div className="logo-text">
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <img src={logo} width="100px"/>
            </Link>
          </div>
          <div style={{ flex: 1 }} className="px-5">
            <input
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              className={`search-bar ${
                this.state.searchBarIsFocused ? "active" : null
              }`}
              type="text"
              placeholder="Cari produk impianmu disini"
            />
          </div>
          <div className="d-flex flex-row align-items-center">
            {/* <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
            <p className="small ml-3 mr-4">Profile</p>
            <FontAwesomeIcon
              className="mr-2"
              icon={faShoppingCart}
              style={{ fontSize: 24 }}
            />
            <CircleBg>
              <small style={{ color: "#3C64B1", fontWeight: "bold" }}>4</small>
            </CircleBg> */}
            <Link to="/login" style={{ textDecoration: "none"}}>
              <ButtonUI className="mr-3" type="textual">
                Sign in
              </ButtonUI>
            </Link>
            <Link to="/register">
              <ButtonUI type="contained">Sign up</ButtonUI>
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
          <div className="logo-text">
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <img src={logo} width="100px"/>
            </Link>
          </div>
          <div style={{ flex: 1 }} className="px-5">
            <input
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              className={`search-bar ${
                this.state.searchBarIsFocused ? "active" : null
              }`}
              type="text"
              placeholder="Cari produk impianmu disini"
            />
          </div>
          <div className="d-flex flex-row align-items-center">
            {/* <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
            <p className="small ml-3 mr-4">Profile</p>
            <FontAwesomeIcon
              className="mr-2"
              icon={faShoppingCart}
              style={{ fontSize: 24 }}
            />
            <CircleBg>
              <small style={{ color: "#3C64B1", fontWeight: "bold" }}>4</small>
            </CircleBg> */}
            <Link to="/" type="text" onClick={this.logOut}>Logout</Link> &nbsp;
            <Link to={`/profile/${this.props.user.username}`} style={{ textDecoration: "none"}}>
              {this.props.user.username}
              <img src={user1} width="30px" />
            </Link>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}
const mapDispatchToProps = {
  logoutHandler,
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
