import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import { 
    Text,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Actions = ({onComment, onAdd, canJoin=true}) => (
    <View style={styles.root}>
        {canJoin && (
            <Button transparent style={styles.button} onPress={onAdd}>
                <Icon name="user-plus" size={25} />
            </Button>
        )}
        <Button transparent style={styles.button} onPress={onComment}>
            <Icon name="comment" size={25} />
        </Button>
        <Button transparent style={styles.button}>
            <Icon name="heart" size={25} />
        </Button>
    </View>
);

const styles = StyleSheet.create({
    root : {
        flexDirection : "row",
        justifyContent : "flex-end",
        paddingHorizontal : 10,
    },
    button : {
        width : 45,
        justifyContent : "center",
        alignItems : "center",
        marginHorizontal : 2,
    },
});

Actions.propTypes = {
    onAdd       : PropTypes.func,
    onLike      : PropTypes.func,
    onComment   : PropTypes.func,
};

export default Actions;