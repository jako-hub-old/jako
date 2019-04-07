import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { 
    Text,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Actions = ({onAdd, canJoin=true, user, onViewProfile}) => (
    <View style={styles.root}>
        <View style = {styles.profileButton}>
            <Text note style = {{marginRight : 10}}>
                Anfitrión:
            </Text>
            <TouchableOpacity style={styles.buttonLink} transparent onPress={onViewProfile}>
                <Text>{user}</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.buttonsWrapper}>
            {canJoin && (
                <Button transparent style={styles.button} onPress={onAdd}>
                    <Icon name="user-plus" size={25} />
                </Button>
            )}
            <Button transparent style={styles.button}>
                <Icon name="heart" size={25} />
            </Button>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    buttonsWrapper : {
        flexDirection : "row",
        justifyContent : "flex-end",
        paddingHorizontal : 10,
    },
    profileButton : {
        flex : 2,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-end",
    },
    button : {
        width : 45,
        justifyContent : "center",
        alignItems : "center",
        marginHorizontal : 2,
    },
});

Actions.propTypes = {
    onAdd           : PropTypes.func,
    onLike          : PropTypes.func,
    onComment       : PropTypes.func,
    onViewProfile   : PropTypes.func,
    user            : PropTypes.string,
};

export default Actions;