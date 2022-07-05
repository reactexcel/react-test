import { combineReducers } from "redux";
import { GET_ADMIN_USER_DETAILS, GET_SIMPLE_USER_DETAILS } from "./action";
const initialState = {
  admin_user_details: [],
  simple_user_details: [],
};
const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_USER_DETAILS: {
      return {
        ...state,
        admin_user_details: action.payload,
      };
    }
    case GET_SIMPLE_USER_DETAILS: {
      return {
        ...state,
        simple_user_details: action.payload,
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
});
