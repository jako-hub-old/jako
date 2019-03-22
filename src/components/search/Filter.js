import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import {
    Input,
    Form,
    Item,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

/** 
 * 
 */
const Filter = () => (
    <Form style={styles.form}>
        <Item rounded style={styles.row}>
            <Input
                placeholder="Busca juegos"
             />
            <Icon 
                style={styles.icon} 
                name="search" 
                size={30}                 
            />
        </Item>
    </Form>
);

const styles = StyleSheet.create({
    form : {
        flex : 1,
    },
    icon : {
        marginRight : 15,
        color : "#cfd8dc",
    },
    row : {
        paddingLeft : 30,
    },
    input : {
        width : "100%",
    },
});

export default Filter;
