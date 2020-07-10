const initialState = {
  isLoading: false,
  isLogin: false,
  isSuccess: false,
  isError: false,
  msg: '',
  token: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        msg: action.payload.response.data.message,
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
        token: action.payload.data.token,
        msg: action.payload.data.message,
      };
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.message,
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.message,
      };
    }
    case 'LOGOUT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'LOGOUT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.message,
      };
    }
    case 'LOGOUT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        token: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
