import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from './screens/Colors';

import Log from './screens/login';
import Reg from './screens/register';
import Land from './screens/land';
import Scan from './screens/Scan';
import Map from './screens/map';
import Home from './screens/home';
import finished from './screens/finished';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Land" component={Land} options={Options('')} />
        <Stack.Screen name="Login" component={Log} options={Options('Sign In')} />
        <Stack.Screen name="Reg" component={Reg} options={Options('Sign Up')} />
        <Stack.Screen name="Map" component={Map} options={Options('Navigator')} />
        <Stack.Screen name="Home" component={Home} options={Options('Home')} />
        <Stack.Screen name="Scan" component={Scan} options={Options('')} />
        <Stack.Screen name="Finished" component={finished} options={Options('')} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Options = (title) => ({
  title: title,
  headerStyle: {
    backgroundColor: Colors.dark,
  },
  headerTintColor: Colors.green,
});
