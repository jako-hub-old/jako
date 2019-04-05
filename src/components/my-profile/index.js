import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Button,
} from 'native-base';
import { withSession } from '../../providers';
import UserProfileCard from '../user-profile-card';

class MyProfileComponent extends React.Component {
    render() {
        const {
            navigation,
            logout,
            sessionStack:{userCode}
        } = this.props;
        return (
            <View style = { styles.root }>
                <UserProfileCard playerCode = { userCode } />
                <Button light onPress = { () => logout(navigation) }>
                    <Text> Logout </Text>
                </Button>
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