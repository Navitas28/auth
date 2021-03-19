import axios from 'axios';
import {AUTHENTICATE, SET_DID_TRY_AL, LOGOUT} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
};

export const getOtp = (mobile) => async (dispatch) => {
  try {
    await axios.post('http://www.api-hnj.xyz/api/users/signup', {
      value: mobile,
      type: 'OTP',
    });
  } catch (err) {
    console.log('🚀 : ==> file: authActions.js : ==> line 27 : ==> err', err);
    // unhandled rejections
  }
};

export const verifyOtp = (token, mobile) => async (dispatch) => {
  console.log(token, mobile);
  try {
    const response = await axios.post(
      'http://www.api-hnj.xyz/api/users/validate/otp',
      {token, value: mobile},
    );
    console.log('Response', response.data);
    dispatch({type: AUTHENTICATE, payload: response.data});
    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn, 10) * 1000,
    );
    saveDataToLocalStorage(response.token, response.userId, expirationDate);
  } catch (err) {
    console.log(
      '😤 🤬 : ==> file: authActions.js : ==> line 28 : ==> err',
      err,
    );
  }
};

export const setDidTryAL = () => {
  return {type: SET_DID_TRY_AL};
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('user_data');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataToLocalStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'user_data',
    JSON.stringify({token, userId, expiryDate: expirationDate.toISOString()}),
  );
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
