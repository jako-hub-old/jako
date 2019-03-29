import React from 'react';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import {
    UserInfoVerifier,
} from '../../components';


/**
 * This is the main or home screen for the application.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class HomeScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <>
            <BaseScreen navigation={navigation}>
                
            </BaseScreen>
            <UserInfoVerifier />
            </>
        );
    }
}

HomeScreen.propTypes = {
    navigation : PropTypes.object,
};

export default HomeScreen;