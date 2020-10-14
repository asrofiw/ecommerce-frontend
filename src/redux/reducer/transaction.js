/* eslint-disable linebreak-style */
const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  alertMsg: '',
  statusMsg: '',
  dataTransaction: [],
  summary: 0,
  deliveryFee: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POST_TRANSACTION_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_TRANSACTION_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_TRANSACTION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        dataTransaction: action.payload.data.data,
        summary: action.payload.data.summary,
        deliveryFee: action.payload.data.deliveryFee,
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
