import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import ImagePreview from './ImagePreview';
import PropTypes from 'prop-types';

/**
 * This component renders the Item presentation
 * @param {*} param0 
 */
const Item = ({item, onSelect, onAdd}) => (
    <View style={styles.root}>
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.wrapper}>
                <View style={styles.pictureWrapper}>
                    <ImagePreview />
                </View>
                <View style={styles.infoWrapper}>
                    <Header
                        title = {item.nombre}
                        date  = {item.fecha}
                        totalPlayers = {item.jugadores}
                        confirmedPlayers = {item.jugadores_confirmados}
                    />
                    <Content 
                        item={item}
                    />                    
                </View>
            </View>
        </TouchableOpacity>
        <Footer
            onAdd = { onAdd }
         />
    </View>
    
);

const styles = StyleSheet.create({
    root : {
        flex : 1,
        marginVertical : 15,
    },
    wrapper : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "space-between",
        alignItems      : "center",
    },
    pictureWrapper : {
        flex : 3,
        justifyContent : "center",
        alignItems  : "center",
    },
    infoWrapper : {
        flex : 7,
    },
});

Item.propTypes = {
    onSelect    : PropTypes.func,
    onAdd       : PropTypes.func,
    onComment   : PropTypes.func,
};

export default Item;