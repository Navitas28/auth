import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DefaultStyles from '../styles/DefaultStyles';
import BottomTabNavigator from './tabs/BottomTabNavigator';

import Divider from '../components/UI/Divider';

const DrawerNavigator = createDrawerNavigator();

const Navigator = () => {
  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={styles.container}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
              <Drawer.Section>
                <View style={styles.userAvatar}>
                  <Avatar.Image
                    source={require('../assets/images/avatar.png')}
                    size={50}
                  />
                  <View style={styles.userAvatarInfo}>
                    <Title style={styles.userAvatarInfoTitle}>John Doe</Title>
                    <Caption style={styles.userAvatarInfoCaption}>
                      @j_doe
                    </Caption>
                  </View>
                </View>
                <Divider />
              </Drawer.Section>
              <Drawer.Section>
                <DrawerItemList {...props} />
              </Drawer.Section>
              <Drawer.Section>
                <View style={styles.logout}>
                  <DrawerItem
                    icon={({color, size}) => (
                      <MaterialIcons
                        name={'logout'}
                        color={color}
                        size={size}
                      />
                    )}
                    label="Sign Out"
                    onPress={() => {}}
                  />
                </View>
              </Drawer.Section>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: DefaultStyles.colors.primary,
      }}>
      <DrawerNavigator.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: (props) => <MaterialIcons name="menu" size={23} />,
        }}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  userAvatar: {
    flexDirection: 'row',
    marginTop: 15,
    paddingLeft: 20,
  },
  userAvatarInfo: {
    marginLeft: 15,
  },
  userAvatarInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userAvatarInfoCaption: {
    fontSize: 14,
    lineHeight: 14,
  },
  logout: {
    marginTop: 'auto',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
    marginLeft: 2,
  },
});
