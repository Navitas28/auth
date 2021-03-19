import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../store/actions';
import DefaultStyles from '../styles/DefaultStyles';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log(
        '😤 🤬 : ==> file: StartupScreen.js : ==> line 14 : ==> userData',
        userData,
      );

      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }

      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={DefaultStyles.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
