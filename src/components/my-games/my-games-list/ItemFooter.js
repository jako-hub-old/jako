import React from 'react';
import {
    View,
    StyleSheet,
    Text,
 } from 'react-native';
import PropTypes from 'prop-types';

const ItemFooter = () => (
    <View style={styles.root}>
        <Text>The footer!</Text>
    </View>
);

const styles = StyleSheet.create({
    root : {

    },
});

ItemFooter.propTypes = {

};

export default ItemFooter;