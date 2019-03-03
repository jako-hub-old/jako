import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store/store';
import { Root } from 'native-base';
import AppNavigator from './src/configs/navigators';
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
        <ReduxProvider store={store}>
            <Root>
                <ReduxProvider store={store}>
                    <Root>
                        <AppContainer/>
                    </Root>
                </ReduxProvider>
            </Root>
        </ReduxProvider>
    );
  }
}