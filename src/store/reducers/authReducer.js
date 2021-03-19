import {AUTHENTICATE, LOGOUT, SET_DID_TRY_AL} from '../types';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.payload.token,
        userId: action.payload.id,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      console.log('Inside the reducer SET_DID_TRY_AL');
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
