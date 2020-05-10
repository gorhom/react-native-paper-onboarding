import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
  },
  text: {
    color: 'white',
  },
});

interface CustomButtonProps {
  onPress: () => void;
}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>X</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
