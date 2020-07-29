const initialState = {
  dataGenres: [],
  pageInfo: [],
  isLoading: false,
  successMsg: '',
  isError: false,
  isSuccess: false,
  errorMsg: '',
  token: null,
};

const genres = (state = initialState, action) => {
  switch (action.type) {
    case 'GENRES_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'GENRES_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'GENRES_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataGenres: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    // POST
    case 'POST_GENRES_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'POST_GENRES_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'POST_GENRES_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        successMsg: action.payload.data.message,
      };
    }
    // UPDATE
    case 'UPDATE_GENRES_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'UPDATE_GENRES_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_GENRES_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        successMsg: action.payload.data.message,
      };
    }
    // delete
    case 'DELETE_GENRES_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'DELETE_GENRES_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'DELETE_GENRES_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default genres;
