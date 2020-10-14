/* eslint-disable linebreak-style */
const initialState = {
  isLoading: false,
  isError: false,
  alertMsg: '',
  dataCheckout: [],
  summary: 0,
  deliveryFee: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POST_CHECKOUT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_CHECKOUT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Unexpected error occurred',
      };
    }
    case 'POST_CHECKOUT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Successfully add cart to checkout',
        dataCheckout: action.payload.data.data,
        summary: action.payload.data.summary,
        deliveryFee: action.payload.data.deliveryFee,
      };
    }
    default: {
      return state;
    }
  }
};
