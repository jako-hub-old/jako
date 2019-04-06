import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import { withSession } from '../../providers';
import UserProfileCard from '../user-profile-card';
import UserOptions from './UserOptions';

/**
 * This component handles the user profile actions.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 *
 * @class MyProfileComponent
 * @extends {React.Component}
 */
class MyProfileComponent extends React.Component {
    onLogout() {
        const { navigation, logout } = this.props;
        if(logout) logout(navigation);
    }

    render() {
        const { sessionStack:{userCode}, navigation } = this.props;
        return (
            <View style = { styles.root }>
                <UserProfileCard 
                    playerCode          = { userCode   } 
                    navigation          = { navigation }
                    optionsComponent    = { (
                        <UserOptions 
                            onLogout = { () => this.onLogout() }
                        />
                    ) }
                />                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

MyProfileComponent.propTypes = {
    navigation  : PropTypes.object.isRequired,
    logout      : PropTypes.func,
};

export default withSession(MyProfileComponent);