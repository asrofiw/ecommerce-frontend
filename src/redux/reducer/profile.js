/* eslint-disable linebreak-style */
const initialStateProfile = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  fetchCount: 0,
  alertMsg: '',
  statusMsg: '',
  isUpdate: false,
  isErrorUpdate: false,
  updateMsg: '',
  dataProfile: {},
  updateProfile: {},
};

export default (state = initialStateProfile, action) => {
  switch (action.type) {
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        statusMsg: 'Succes',
        fetchCount: state.fetchCount + 1,
        alertMsg: action.payload.data.message,
        dataProfile: action.payload.data.data[0],
      };
    }
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        isUpdate: false,
        isLoading: false,
        isErrorUpdate: true,
        statusMsg: 'Failed',
        updateMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isUpdate: true,
        statusMsg: 'Succes',
        updateMsg: action.payload.data.message,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isUpdate: false,
        isSuccess: false,
        isError: false,
        isErrorUpdate: false,
        alertMsg: '',
        statusMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
