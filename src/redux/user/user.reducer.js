import UserActionTypes from "./user.types";

const {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  // SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} = UserActionTypes;

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, error: null };

    case SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, error: null };

    case SIGN_IN_FAILURE:
    case SIGN_OUT_FAILURE:
    case SIGN_UP_FAILURE:
      return { ...state };
    case UserActionTypes.SET_CURRENT_USER:
      return { ...state, error: payload };

    default:
      return state;
  }
};
