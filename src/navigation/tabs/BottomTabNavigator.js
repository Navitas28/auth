import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefaultStyles from '../../styles/DefaultStyles';
import HomeScreen, {
  screenOptions as homeScreenOptions,
} from '../../screens/HomeScreen';
import UserDetailScreen, {
  screenOptions as userDetailScreenOptions,
} from '../../screens/user/UserDetailsScreen';
import {defaultNavOptions} from '../../utils/helpers';

const TabNavigator = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <TabNavigator.Navigator screenOptions={defaultNavOptions}>
      <TabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <TabNavigator.Screen
        name="User Details"
        component={UserDetailScreen}
        navigationOptions={userDetailScreenOptions}
      />
    </TabNavigator.Navigator>
  );
};

export default BottomTabNavigator;
