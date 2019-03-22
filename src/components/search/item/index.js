import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const Item = ({item, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.root}>
            <View style={styles.wrapper}>
                <View style={styles.pictureWrapper}>
                    <Icon name="image" size={80}/>
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
                    <Footer
                        
                    />
                </View>
            </View>
        </View>
    </TouchableOpacity>
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
        padding : 5,
    },
    infoWrapper : {
        flex : 7,
    },
});

Item.propTypes = {
    onPress : PropTypes.func,
};

export default Item;