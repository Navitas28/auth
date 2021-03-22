import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text, TextInput, HelperText, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm, Controller} from 'react-hook-form';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import * as authActions from '../../store/actions';
import DefaultStyles from '../../styles/DefaultStyles';
import {isAndroid} from '../../utils/helpers';
const WEB_CLIENT_ID =
  '440700986057-46mb9bp4krfmhh4hu06e6r935dl09hls.apps.googleusercontent.com';

const AuthScreen = (props) => {
  const {control, handleSubmit, errors} = useForm();
  const [btnText, setBtnText] = useState('Sign in');
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const mobile = data.mobile.replace(/[^\d]/g, '');
    dispatch(authActions.getOtp(mobile));
    props.navigation.navigate('OtpVerify', {mobile});
  };
  useEffect(() => {
    configureGoogleSign();
  }, []);

  const configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  };

  const onSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      console.log('User', userInfo.user);
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          console.log('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          console.log('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          console.log('play services not available or outdated');
          break;
        default:
          console.log('Something went wrong', error.toString());
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={isAndroid ? 'height' : 'padding'}
      keyboardVerticalOffset={49}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/images/logo-2.png')}
          />
          <Image
            style={styles.background}
            source={require('../../assets/images/auth_base.png')}
          />
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.mobile}>
            <Controller
              control={control}
              name="mobile"
              defaultValue=""
              render={({onChange, onBlur, value}) => (
                <>
                  <TextInput
                    mode="outlined"
                    label="Mobile Number"
                    style={styles.mobileInput}
                    value={value}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    onChangeText={(enteredText) => onChange(enteredText)}
                    left={
                      <TextInput.Icon
                        name={() => (
                          <MaterialIcons
                            name="call"
                            size={20}
                            color={DefaultStyles.colors.primary}
                          />
                        )}
                      />
                    }
                  />
                  <HelperText type="error">{errors.mobile?.message}</HelperText>
                </>
              )}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.text}>{btnText}</Text>
            </Button>
          </View>

          <Text style={styles.ortext}>OR</Text>
          <View style={styles.buttonContainer}>
            {/*  <Button
              mode="contained"
              color="#ea4335"
              onPress={onSignup}
              style={styles.button}>
              <MaterialCommunityIcons
                name="google"
                size={24}
                color="#eee"
                style={styles.icon}
              />
              <Text style={styles.text}>{btnText}</Text>
            </Button> */}
            <TouchableWithoutFeedback onPress={() => onSignup()}>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Auto}
              />
            </TouchableWithoutFeedback>

            <Button
              mode="contained"
              color="#3b5998"
              style={styles.button}
              onPress={onSignup}>
              <MaterialCommunityIcons
                name="facebook"
                size={24}
                color="#eee"
                style={styles.icon}
              />
              <Text style={styles.text}>{btnText}</Text>
            </Button>
          </View>
          <View style={styles.btnContainer}>
            <Text>
              {btnText === 'Sign in'
                ? "Don't have an account,"
                : 'Already have an account,'}
            </Text>
            <Text
              onPress={() => setBtnText('Sign up')}
              style={styles.signUpText}>
              {btnText === 'Sign in' ? 'Sign up' : 'Sign in'}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  console.log(
    '😤 🤬 : ==> file: AuthScreen.js : ==> line 150 : ==> navData',
    navData.navigation,
  );

  return {
    headerTitle: 'Authenticate',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  tinyLogo: {
    width: 140,
    height: 40,
    margin: 20,
    marginBottom: 5,
    alignSelf: 'center',
  },
  title: {
    fontFamily: DefaultStyles.fonts.regular,
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  },
  background: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  mobile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileInput: {
    width: '60%',
    height: 45,
  },
  button: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    flex: 4,
    color: 'white',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DefaultStyles.colors.accent,
  },
});

export default AuthScreen;
