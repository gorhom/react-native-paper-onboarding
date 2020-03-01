import React from 'react';
import { StatusBar, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Default } from './Default';
import { WithoutImage } from './WithoutImage';
import { WithoutIcon } from './WithoutIcon';

const Stack = createStackNavigator();

const screens = [
  {
    title: 'Default',
    screen: 'Default',
  },
  {
    title: 'Without Image',
    screen: 'WithoutImage',
  },
  {
    title: 'Without Icon',
    screen: 'WithoutIcon',
  },
];

// @ts-ignore
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {screens.map(item => {
        return (
          <Button
            title={item.title}
            onPress={() => navigation.navigate(item.screen)}
          />
        );
      })}
    </View>
  );
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Default" component={Default} />
          <Stack.Screen name="WithoutImage" component={WithoutImage} />
          <Stack.Screen name="WithoutIcon" component={WithoutIcon} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
