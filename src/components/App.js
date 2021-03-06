'use strict';
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import PropertyDetailsScreen from './PropertyDetailsScreen';
import SearchScreen from './SearchScreen';
import PropertyFormScreen from './PropertyFormScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    SearchProperty: SearchScreen,
    Details: PropertyDetailsScreen,
    AddProperty: PropertyFormScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);



class App extends Component {
  render() {
    return <RootStack />;
  }
}

export default App;
