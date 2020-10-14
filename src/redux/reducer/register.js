const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  alertMsg: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_CUSTOMER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CREATE_USER_CUSTOMER_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'I know you forget something! Try again!',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'CREATE_USER_CUSTOMER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        statusMsg: 'Click \'OK\' for your next awesome moment!',
        alertMsg: action.payload.data.message,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccess: false,
        isError: false,
      };
    }
    default: {
      return state;
    }
  }
};
