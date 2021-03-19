import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const UserDetailsScreen = (props) => {
  return (
    <View>
      <Text>UserDetailsScreen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Your Details',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={'menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({});

export default UserDetailsScreen;
