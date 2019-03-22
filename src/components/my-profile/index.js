import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'react-native';
import {
    Button,
} from 'native-base';
import { withSession } from '../../providers';


class MyProfileComponent extends React.Component {
    render() {
        const {
            navigation,
            logout,
        } = this.props;
        return (
            <View>
                <Button light onPress = { () => logout(navigation) }>
                    <Text> Logout </Text>
                </Button>
            </View>
        );
    }
}

MyProfileComponent.propTypes = {
    navigation  : PropTypes.object.isRequired,
    logout      : PropTypes.func,
};

export default withSession(MyProfileComponent);