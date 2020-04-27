import React from "react";
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { register } from "../../../serviceWorker";
import { connect } from "react-redux"
import { registerHandler } from "../../../redux/actions"
import { Link } from "react-router-dom";

class RegisterScreen extends React.Component {

    state = {
        email: "",
        username: "",
        password: "",
        repassword: "",
        fullName: "",
        role: "",
    };
    inputHandler = (e, field) => {
        const {value} = e.target;
        this.setState({[field]: value});
    };
    postDataRegistrasi = () => {
        const { email, username, password, repassword, fullName, role} = this.state
        const userData = {
            email, username, password, repassword, fullName, role
        }
        this.props.onRegister(userData)
    }
    render() {
        return(
            <div className="container">
                <div className="row mt-3">
                    <div className="col-5">
                        <div>
                            <h3>REGISTER</h3>
                            <p className="mt-4">
                                You will get the best recommendation for rent
                                <br/>
                                house in near of you
                            </p>
                            <TextField placeholder="Email" className="mt-5" onChange={(e) => this.inputHandler(e, "email")} />
                            <TextField placeholder="Username" className="mt-2" onChange={(e) => this.inputHandler(e, "username")} />
                            <TextField placeholder="Password" className="mt-2" onChange={(e) => this.inputHandler(e, "password")} />
                            <TextField placeholder="Repassword" className="mt-2" onChange={(e) => this.inputHandler(e, "repassword")} />
                            <TextField placeholder="Full Name" className="mt-2" onChange={(e) => this.inputHandler(e, "fullName")} />
                            <TextField placeholder="Role" className="mt-2" onChange={(e) => this.inputHandler(e, "role")} />

                            <div className="d-flex justify-content-center">
                                <ButtonUI
                                    type="contained"
                                    className="mt-4 align-self-center"
                                    onClick={this.postDataRegistrasi}>Register</ButtonUI>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        picture
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}
const mapDispatcToProps = {
    onRegister: registerHandler
    
}

export default connect(mapStateToProps, mapDispatcToProps) (RegisterScreen);