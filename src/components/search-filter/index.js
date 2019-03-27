import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    Input,
    Form,
    Item,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withSearch } from '../../providers';

const SearchFilter = ({onChangeQuery, searchQuery}) => {
    return (
        <Form style={styles.form}>
            <Item rounded style={styles.inputContainer}>
                <Input
                    placeholder="Busca en jako"
                    value       = { searchQuery }
                    onChangeText= { text => onChangeQuery(text) }
                    style       = {styles.input}
                />
                <Icon 
                    style={styles.icon} 
                    name="search" 
                    size={30}                 
                />
            </Item>
        </Form>
    );
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
        flexDirection : "row",
        alignItems : "flex-start",
        justifyContent : "flex-start",        
    },
    form : {
        flex : 1,
    },
    icon : {
        marginRight : 15,
        color : "#cfd8dc",
    },
    inputContainer : {
        paddingLeft : 30,
        backgroundColor : "#FFF",
        height : 48,
    },
    input : {
        
    },
    input : {
        width : "100%",
    },
});

SearchFilter.propTypes = {
    searchQuery     : PropTypes.string,
    onChangeQuery   : PropTypes.func,
};

export default withSearch(SearchFilter);