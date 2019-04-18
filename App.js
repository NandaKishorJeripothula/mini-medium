import React from 'react';//For handling props type and necessity

// import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import AppContainer from './src/components/appNavigator';
//Redux Store to maintain state tree
//StoreCreator and Provider from redux kits
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './src/redux/reducer';

//Creating store with the reducer 
const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    )
  }
}
