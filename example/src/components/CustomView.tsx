import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  buttonText: {
    padding: 15,
    color: 'white',
    backgroundColor: '#333',
  },
});

const CustomView = () => {
  const handleButtonPress = () => {
    Alert.alert('Button Clicked !');
  };
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.item} />
      <View style={styles.item} />
      <View style={styles.item2} />
      <TouchableOpacity onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomView;
