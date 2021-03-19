import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider as PaperDivider} from 'react-native-paper';

const Divider = (props) => {
  return <PaperDivider style={{...styles.container, ...props.style}} />;
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default Divider;
