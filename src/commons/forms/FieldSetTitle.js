import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
} from 'native-base';
import PropTypes from 'prop-types';

/**
 * This component renders a fildset for a form.
 * @param {*} param0 
 */
const FieldSetTitle = ({title}) => (
    <View style={styles.root}>
        <Text>{title}</Text>
        <View style={styles.separator} />
    </View>
);

const styles = StyleSheet.create({
    root : {

    },
});

FieldSetTitle.propTypes = {
    title : PropTypes.string,
};

export default FieldSetTitle;