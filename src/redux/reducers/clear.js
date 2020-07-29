const initialState = {
  isLoading: false,
  isError: false,
  msg: '',
};

const clear = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR': {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default clear;
