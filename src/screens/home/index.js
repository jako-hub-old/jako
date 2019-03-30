import React from 'react';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import {
    UserInfoVerifier,
} from '../../components';
import { withNavigationFocus } from 'react-navigation';

/**
 * This is the main or home screen for the application.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class HomeScreen extends React.PureComponent {
    render() {
        const {
            isFocused,
            navigation
        } = this.props;
        console.log("Has focus", isFocused);
        return (
            <>
            <BaseScreen navigation={navigation}>
                
            </BaseScreen>
            {isFocused && (<UserInfoVerifier navigation = {navigation}/>)}
            </>
        );
    }
}

HomeScreen.propTypes = {
    navigation : PropTypes.object,
};

export default withNavigationFocus(HomeScreen);