import * as types from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case types.FETCH_GRADES: {
      return { data: action.payload.data };
    }
    case types.GRADES_ERROR: {
      return { error: action.payload.error };
    }
    case types.SELECTED_CLASS: {
      return { ...state, selectedClass: action.payload };
    }
    case types.REMOVE_GRADES: {
      return {};
    }
    default: {
      return state;
    }
  }
}
