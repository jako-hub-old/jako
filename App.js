import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store/store';
import { Root } from 'native-base';
import AppNavigator from './src/configs/navigators';
const AppContainer = createAppContainer(AppNavigator);

/**
 * This is the main application component, here we can put every component we need to
 * keep alive.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
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