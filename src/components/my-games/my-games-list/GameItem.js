import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Text,
    Card,
    CardItem,
    Body,
} from 'native-base';
import PropTypes from 'prop-types';
import ItemHeader from './ItemHeader';
import ItemFooter from './ItemFooter';

const GameItem = () => (
    <Card noShadow bordered style={styles.root}>
        <CardItem header style={styles.header}>
            <ItemHeader
                title={"My game!"}
            />
        </CardItem>
        <CardItem cardBody>
            <Body><Text>item!!</Text></Body>
        </CardItem>
        <CardItem footer>
            <ItemFooter/>
        </CardItem>
    </Card>
);

const styles = StyleSheet.create({
    root : {
        marginVertical : 2,
    },
    header : {
        marginVertical : 2,
    },
    footer : {

    },
});

GameItem.propTypes = {

};

export default GameItem;