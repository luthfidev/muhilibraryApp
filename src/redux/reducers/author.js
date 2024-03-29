const initialState = {
  dataAuthors: [],
  pageInfo: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  successMsg: '',
  token: null,
};

const authors = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHORS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'AUTHORS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'AUTHORS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAuthors: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    // POST
    case 'POST_AUTHORS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'POST_AUTHORS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'POST_AUTHORS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        successMsg: action.payload.data.message,
      };
    }
    // UPDATE
    case 'UPDATE_AUTHORS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'UPDATE_AUTHORS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_AUTHORS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        successMsg: action.payload.data.message,
      };
    }
    // delete
    case 'DELETE_AUTHORS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'DELETE_AUTHORS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMsg: action.payload.response.data.message,
      };
    }
    case 'DELETE_AUTHORS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
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

export default authors;
