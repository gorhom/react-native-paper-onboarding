import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootScreen from './screens/Root';
import { Default } from './screens/Default';
import { WithoutImage } from './screens/WithoutImage';
import { WithoutIcon } from './screens/WithoutIcon';
import { WithStyling } from './screens/WithStyling';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root" headerMode="none">
          <Stack.Screen name="Root" component={RootScreen} />
          <Stack.Screen name="Default" component={Default} />
          <Stack.Screen name="WithStyling" component={WithStyling} />
          <Stack.Screen name="WithoutImage" component={WithoutImage} />
          <Stack.Screen name="WithoutIcon" component={WithoutIcon} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
