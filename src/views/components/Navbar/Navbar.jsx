import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button.tsx";
import Profil from "../../../assets/images/user1.png"
import Logo from "../../../assets/images/LogoBrand.png";
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
          {
            this.props.user.id ? (
              <>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
              <p className="small ml-3 mr-4">{this.props.user.username}</p>
              {
                this.props.user.role === "admin" ? (
                  <>
                  <Link to="/admin/dashboard" style={{ textDecoration: "none"}}>
                    <ButtonUI type="textual">Dasboard</ButtonUI>
                  </Link>
                  <Link to="/" style={{ textDecoration: "none"}}>
                    <ButtonUI className="ml-4" type="textual" onClick={this.logOut}>
                      Logout
                    </ButtonUI>
                  </Link>
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
                        4
                      </small>
                    </CircleBg>
                  </Link>
                  <Link to="/" style={{ textDecoration: "none"}}>
                    <ButtonUI className="ml-3" type="textual" onClick={this.logOut}>
                      Logout
                    </ButtonUI>
                  </Link>
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
  logoutHandler,
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
