import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootScreen from './screens/Root';
import DefaultScreen from './screens/Default';
import VerticalGestureScreen from './screens/VerticalGesture';
import WithoutImageScreen from './screens/WithoutImage';
import WithoutIconScreen from './screens/WithoutIcon';
import WithStylingScreen from './screens/WithStyling';
import CustomContentScreen from './screens/CustomContent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root" headerMode="none">
          <Stack.Screen name="Root" component={RootScreen} />
          <Stack.Screen name="Default" component={DefaultScreen} />
          <Stack.Screen
            name="VerticalGesture"
            component={VerticalGestureScreen}
          />
          <Stack.Screen name="WithStyling" component={WithStylingScreen} />
          <Stack.Screen name="WithoutImage" component={WithoutImageScreen} />
          <Stack.Screen name="WithoutIcon" component={WithoutIconScreen} />
          <Stack.Screen name="CustomContent" component={CustomContentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
