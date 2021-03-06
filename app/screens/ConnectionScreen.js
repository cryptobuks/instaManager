import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Alert
} from 'react-native';

import CookieManager from 'react-native-cookies';
import CommonStyles from '../styles/common';
import UserService from '../services/users/UserService';

import LoadingIndicatorView from '../components/LoadingIndicator';

export default class ConnectionScreen extends React.Component {

  static navigationOptions = {
    title: 'Connection'
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
    
  componentDidMount() {
    CookieManager.clearAll();
  }
  
  _onWebViewLoaded() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { this.state.isLoading ? <LoadingIndicatorView/> : null }
        <WebView
          source={{uri: global.instaFacade.getAuthorizationUrl()}}
          onLoadEnd={this._onWebViewLoaded.bind(this)}
          style={(this.state.isLoading ? styles.loadingWebView : styles.loadedWebView)}
          onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}
        />
      </View>
    );
  }

  _onShouldStartLoadWithRequest(webViewState) {
    
    if (webViewState.url.startsWith(global.instaFacade.config.redirectUri)) {
      // redirect Uri lookslike http://<redirect path>?<parameters>
      // Parameters might be
      // - code=<code>
      // - error=<error>&error_reason=<reason>&error_description=<decription>
      // -> extract code and return false
      const parametersStart = global.instaFacade.config.redirectUri.length + 1; // + 1 for '?' (explicit) or '#' (implicit)
      const parameters = webViewState.url.substr(parametersStart);
      
      if (parameters.startsWith('access_token=')) {

        // Client-side authentication (Implicit) -> for mobile app
        const accessToken = parameters.substr('access_token='.length);
        this._getUserInformations(accessToken);
        
      } else {
        // cancel authorization = go back to unconnected home
        this.props.navigation.goBack();
      } 
      
      return false;
    }

    return true;
  }

  _getUserInformations(accessToken) {

    const userServiceDelegate = new UserService('self');//, (response) => this._onGetUserInfo(response, accessToken));
    global.serviceManager.invoke(userServiceDelegate, accessToken)
    .then((userInfo) => {
      // FIXME: why forcing the context as this for _onGetUserInfo?
      //        while this._onGetUserInfo is properly called????
      this._onGetUserInfo.call(this, userInfo, accessToken);
    });
  }

  _onGetUserInfo(userInfo, accessToken) {
    global.instaFacade.openSession(accessToken);
    global.instaFacade.setLastUserInfo(userInfo.id, accessToken);
    global.userManager.setCurrentUser(userInfo, accessToken);
    this.props.navigation.navigate('AppStack');
  }
}

const styles = StyleSheet.create({
  loadedWebView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loadingWebView: {
    width: 0,
    height: 0
  }
});
