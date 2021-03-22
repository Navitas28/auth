import {Alert} from 'react-native';
import FBSDK from 'react-native-fbsdk';

const {AccessToken, GraphRequest, GraphRequestManager, LoginManager} = FBSDK;
export function fbLogin(dataCallback, errorCallback) {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    (result) => {
      if (result.isCancelled) {
        errorCallback('cancel');
      } else {
      }

      if (!result.isCancelled) {
        AccessToken.getCurrentAccessToken().then((data) => {
          const accessToken = data.accessToken;
          const responseInfoCallback = (error, result) => {
            if (error) {
              Alert.alert('Unable to Login, Please try again!', error);
              errorCallback(error);
            } else {
              dataCallback(accessToken.toString(), result);
            }
          };

          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken,
              parameters: {
                fields: {
                  string:
                    'email,name,first_name,middle_name,last_name,picture.type(large)',
                },
              },
            },
            responseInfoCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    },
    function (error) {
      Alert.alert('Login fail with error: ' + error);
      errorCallback(error);
    },
  );
}

export function logOut() {
  LoginManager.logOut();
}
