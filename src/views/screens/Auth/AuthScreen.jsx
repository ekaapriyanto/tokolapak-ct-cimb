import React from "react";
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import "./AuthScreen.css"

class AuthScreen extends React.Component {

    state = {
        activePage: "register",
        form: {},
    }

    renderAuthComponent = () => {
        const {activePage} = this.state;
        
    }
    render() {
        return(
            <div className="container">
                <div className="row mt-5">
                    <div className="col-5">
                        <div className type="d-flex row">
                            <ButtonUI className="auth-screen-btn" type="outlined">Sign Up</ButtonUI>
                            <ButtonUI className="ml-3 auth-screen-btn active" type="contained">Sign In</ButtonUI>
                        </div>
                        <div className="mt-5">
                            <h3>LOG In</h3>
                            <p className="mt-4">
                                welcome back,
                                <br/>
                                please, login to your account
                            </p>
                            <TextField placeholder="Username" className="mt-5" />
                            <TextField placeholder="Password" className="mt-2" />
                            <div className="d-flex justify-content-center">
                                <ButtonUI type="contained" className="mt-4 align-self-center">Login</ButtonUI>
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

export default AuthScreen;
