import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isAndroid} from '../../utils/helpers';

import DefaultStyle from '../../styles/DefaultStyles';

const CustomHeaderButton = (props) => {
  console.log('Inside custome header button');
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={23}
      color={isAndroid ? 'white' : DefaultStyle.colors.primary}
    />
  );
};

export default CustomHeaderButton;
