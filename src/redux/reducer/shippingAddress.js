/* eslint-disable linebreak-style */
const initialStateProfile = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  alertMsg: '',
  statusMsg: '',
  isSuccessPost: false,
  isLoadingPost: false,
  isErrorPost: false,
  alertMsgPost: '',
  statusMsgPost: '',
  dataShippingAddress: [],
};

export default (state = initialStateProfile, action) => {
  switch (action.type) {
    case 'GET_SHIPPING_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_SHIPPING_ADDRESS_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_SHIPPING_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        dataShippingAddress: action.payload.data.result,
      };
    }
    case 'POST_SHIPPING_ADDRESS_PENDING': {
      return {
        ...state,
        isLoadingPost: true,
      };
    }
    case 'POST_SHIPPING_ADDRESS_REJECTED': {
      return {
        ...state,
        isSuccessPost: false,
        isLoadingPost: false,
        isErrorPost: true,
        statusMsgPost: 'Failed',
        alertMsgPost: action.payload.response.data.message,
      };
    }
    case 'POST_SHIPPING_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccessPost: true,
        statusMsgPost: 'Succes',
        alertMsgPost: action.payload.data.message,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccessPost: false,
        isErrorPost: false,
      };
    }
    default: {
      return state;
    }
  }
};
