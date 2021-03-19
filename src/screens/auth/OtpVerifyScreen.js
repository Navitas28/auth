import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text, Card, TextInput, Button} from 'react-native-paper';

import {isAndroid} from '../../utils/helpers';
import * as authActions from '../../store/actions';

const OTPVerifyScreen = (props) => {
  const {mobile} = props.route.params;
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const dispatch = useDispatch();
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };

  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  const onOtpKeyPress = (index) => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const onSubmitButtonPress = () => {
    const otpString = otpArray
      .reverse()
      .reduce((accumulator, currentValue) => currentValue + accumulator, '');
    dispatch(authActions.verifyOtp(otpString, mobile));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text>Enter OTP sent to your mobile number</Text>
        <Card.Content style={styles.inputContainer}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            thirdTextInputRef,
            fourthTextInputRef,
            fifthTextInputRef,
            sixthTextInputRef,
          ].map((textInputRef, index) => (
            <TextInput
              key={index}
              mode="outlined"
              style={styles.input}
              value={otpArray[index]}
              maxLength={1}
              autoFocus={index === 0 ? true : false}
              onKeyPress={onOtpKeyPress(index)}
              onChangeText={onOtpChange(index)}
              keyboardType="numeric"
              ref={refCallback(textInputRef)}
            />
          ))}
        </Card.Content>
        <Card.Actions style={styles.btnContainer}>
          <Button
            mode="contained"
            onPress={onSubmitButtonPress}
            style={styles.btn}>
            <Text>Submit</Text>
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Verification',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 15,
    marginHorizontal: 30,
    padding: 20,
  },
  input: {
    width: '15%',
    fontSize: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    width: '90%',
    paddingHorizontal: 20,
    margin: 20,
  },
});

export default OTPVerifyScreen;
