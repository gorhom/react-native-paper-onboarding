import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PaperOnboarding from 'react-native-paper-onboarding';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{PaperOnboarding.test()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
