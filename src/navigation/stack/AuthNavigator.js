import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthScreen, {
  screenOptions as authScreenOptions,
} from '../../screens/auth/AuthScreen';
import OtpVerifyScreen, {
  screenOptions as otpVerifyScreenOptions,
} from '../../screens/auth/OtpVerifyScreen';
import {defaultNavOptions} from '../../utils/helpers';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="OtpVerify"
        component={OtpVerifyScreen}
        options={otpVerifyScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
