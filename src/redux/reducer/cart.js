/* eslint-disable linebreak-style */
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  alertMsg: '',
  dataCart: [],
  summary: '',
  count: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POST_CART_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Failed to add cart',
      };
    }
    case 'POST_CART_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        alertMsg: 'Successfully add cart',
      };
    }
    case 'GET_CART_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is no item on Cart',
      };
    }
    case 'GET_CART_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Successfully get cart',
        dataCart: action.payload.data.data,
        summary: action.payload.data.summary,
        count: action.payload.data.count,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccess: false,
        isError: false,
      }
    }
    default: {
      return state;
    }
  }
};
