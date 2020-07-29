const initialState = {
  dataUsers: [],
  dataHistoryUsers: [],
  isLoading: false,
  successMsg: '',
  isError: false,
  isSuccess: false,
  errorMsg: '',
  token: null,
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case 'USERS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'USERS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'USERS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUsers: action.payload.data.data,
      };
    }
    // DETAIL
    case 'DETAIL_USERS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'DETAIL_USERS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'DETAIL_USERS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUsers: action.payload.data.data,
      };
    }
    // HISTORY USERS
    case 'HISTORY_USERS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'HISTORY_USERS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'HISTORY_USERS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataHistoryUsers: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    // UPDATE USERS PROFI;E
    case 'UPDATE_USERS_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'UPDATE_USERS_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_USERS_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        token: action.payload.data.token,
        successMsg: action.payload.data.message,
      };
    }
    // UPDATE USERS PROFI;E
    case 'UPLOAD_AVATAR_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'UPLOAD_AVATAR_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data,
      };
    }
    case 'UPLOAD_AVATAR_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        dataUsers: action.payload.data.data,
        successMsg: action.payload.data.message,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default users;
