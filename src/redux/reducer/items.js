const initialState = {
  data: [],
  dataNewest: [],
  urlImage: [],
  dataDetail: {},
  pageInfo: {},
  pageInfoNewest: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DATA_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_DATA_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.dataResult,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_DATA_NEWEST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DATA_NEWEST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_DATA_NEWEST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        dataNewest: action.payload.data.dataResult,
        pageInfoNewest: action.payload.data.pageInfo,
      };
    }
    case 'GET_DATA_DETAIL_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DATA_DETAIL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_DATA_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        dataDetail: action.payload.data.data,
        urlImage: action.payload.data.data.url,
      };
    }
    default: {
      return state;
    }
  }
};
