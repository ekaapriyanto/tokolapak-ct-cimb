import Axios from "axios";
import {API_URL} from "../../constants/API"
import swal from "sweetalert"
import userTypes from '../types/user';

const {ON_LOGIN_SUCCES, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS} = userTypes

export const usernameInputHandler = (text) => {
    return {
        type: "ON_CHANGE_USERNAME",
        payload: text,
    };
};
export const onClickLogin = (login) => {
    return{
        type: "ON_CLICK_LOGIN",
        payload: login,
    };
};

export const registerHandler = (userDataRegister) => {
    return (dispatc) => {
        const {
            username,
            password,
            repassword,
            role,
            fullName,
        } = userDataRegister
        let newUser = {username, password, role, fullName}
        
        Axios.get(`${API_URL}/user`,{
            params: {
                username,
            }
        })
        .then((res) => {
            if (username == 0 || password == 0 || repassword == 0 || role == 0 || fullName == 0){
                swal("Data tidak lengkap, silahkan isi kembali")
            } else {
                if (password == repassword) {
                    if (res.data.length == 0) {
                        Axios.post(`${API_URL}/user`, newUser)
                        .then((res) => {
                            swal("Akun anda telah terdaftar");
                            dispatc({
                                type: ON_LOGIN_SUCCES,
                                payload: res.data
                            })
                            // this.setState({isLogin: true});
                        })
                        .catch((err) => {
                            swal("Terjadi kesalahan pada server");
                            // this.setState({isLoading: false});
                        })
                    } else {
                        swal("Username: " + username + " sudah ada");
                        // this.setState({isLoading: false});
                    }
                } else {
                    swal("password tidak sama")
                }
            }
        })
        .catch((err) => {
            console.log("Error", err)
            // this.setState({isLoading: false})
        })
    }
}

export const loginHandler = (userData) => {
    return (dispatc) => {
        const { username, password } = userData
        Axios.get(`${API_URL}/user`, {
            params: {
                username,
                password,
            }
        })
        .then((res) => {
            if (res.data.length > 0){
                dispatc({
                    type: ON_LOGIN_SUCCES,
                    payload: res.data[0],
                })
            } else {
                dispatc({
                    type: ON_LOGIN_FAIL,
                    payload: "*Username atau Password salah!"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
    };
};

export const userKeepLogin = (userData) => {
    return dispatc => {
        Axios.get(`${API_URL}/user`,{
            params: {
                id: userData.id
            }
        })
        .then(res => {
            console.log(res)
            if (res.data.length > 0){
                dispatc({
                    type: "ON_LOGIN_SUCCESS",
                    payload: res.data[0],
                })
            } else {
                dispatc({
                    type: "ON_LOGIN_FAIL",
                    payload: "*Username atau Password salah!"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}
export const logoutHandler = () =>{
    return(dispatch)=>{
        dispatch({
            type:"ON_LOGOUT_SUCCESS",
            payload: {
                id: 0,
                username: "",
                fullName: "",
                role: "",
            }
        })
    }
}