import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Button,
    List,
    ListItem,
    Right,
    Body,
} from 'native-base';
import { withSession } from '../../providers';
import UserProfileCard from '../user-profile-card';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
                <List>
                    <ListItem button onPress = { () => logout(navigation) } noIndent>
                        <Body><Text>Salir</Text></Body>
                        <Right>
                            <Icon name = { "sign-out-alt" } size = {20} />
                        </Right>
                    </ListItem>
                </List>
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