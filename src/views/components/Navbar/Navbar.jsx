import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import { Link } from "react-router-dom";
import ButtonUI from "../Button/Button.tsx";
import Profil from "../../../assets/images/user1.png"
import Logo from "../../../assets/images/LogoBrand.png";
import { connect } from "react-redux"
import {logoutHandler} from "../../../redux/actions"
import Cookie from "universal-cookie"

const cookiesObject = new Cookie()

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
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

  render() {
    if(!this.props.user.id){
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container" style={{backgroundColor:"white"}}>
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <img src={Logo} width="150px"/>
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
          <Link to="/auth" style={{ textDecoration: "none"}}>
            <ButtonUI className="mr-3" type="textual">
              Sign in
            </ButtonUI>
          </Link>
          <Link to="/auth" style={{ textDecoration: "none"}}>
            <ButtonUI type="contained">Sign up</ButtonUI>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container" style={{backgroundColor:"white"}}>
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <img src={Logo} width="150px"/>
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
          <Link to="/" style={{ textDecoration: "none"}}>
            <ButtonUI className="mr-3" type="textual" onClick={this.logOut}>
              Logout
            </ButtonUI>
          </Link>
          <ButtonUI className="mr-3" type="textual" onClick={this.logOut}>
            {this.props.user.username} <img src={Profil} width="50px"/>
          </ButtonUI>
        </div>
      </div>
    );
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
