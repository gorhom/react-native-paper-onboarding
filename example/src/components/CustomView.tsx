import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    marginBottom: 25,
    backgroundColor: '#333',
  },

  item: {
    width: 300,
    height: 30,
    marginBottom: 12,
    backgroundColor: '#333',
  },

  item2: {
    width: 200,
    height: 30,
    marginBottom: 12,
    backgroundColor: '#333',
  },
});

const CustomView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.item} />
      <View style={styles.item} />
      <View style={styles.item2} />
    </View>
  );
};

export default CustomView;
