import userTypes from '../types/user';

const {ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS} = userTypes

const init_state = {
  id: 0,
  email: "",
  username: "",
  fullName: "",
  address: {},
  role: "",
  errMsg: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { email, username, fullName, role, id } = action.payload;
      return {
        ...state,
        email,
        username,
        fullName,
        role,
        id,
      };
    case ON_LOGIN_FAIL:
      return {...state, errMsg: action.payload}

    default:
      return {...state}
  }
};
