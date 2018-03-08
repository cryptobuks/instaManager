/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Linking
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import ConnectionPage from './components/ConnectionPage.js';
import UnconnectedHomePage from './components/UnconnectedHomePage.js';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }
  
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }
  
  _handleOpenURL(event) {

  }
}

const RootStack = StackNavigator(
  {
    UnconnectedHome: { screen: UnconnectedHomePage },
    Connection: { screen: ConnectionPage },
  },
  {
    initialRouteName: 'UnconnectedHome',
  }
);