import * as types from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_CLASS: {
      return { ...state, added: true, error: '' };
    }
    case types.ERR_CLASS: {
      return { ...state, added: false, error: action.payload.error };
    }
    case types.REMOVE_ALERT: {
      return {
        ...state,
        added: false,
        error: '',
        addedUserClass: false,
        userClassError: '',
      };
    }
    case types.GET_CLASSES: {
      return { ...state, classes: action.payload };
    }
    default: {
      return state;
    }
  }
}
