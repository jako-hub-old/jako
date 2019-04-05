import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header from '../../game-item-header';
import Content from './Content';
import { GameItemBody, } from '../../game-item-header';
import Footer from './Footer';
import ImagePreview from './ImagePreview';
import PropTypes from 'prop-types';

/**
 * This component renders the Item presentation
 * @param {*} param0 
 */
const Item = ({item, onSelect, onAdd, onViewProfile,}) => (
    <View style={styles.root}>
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.wrapper}>
                <View style={styles.pictureWrapper}>
                    <ImagePreview />
                </View>
                <View style={styles.infoWrapper}>
                    <Header
                        title            = { item.nombre                }
                        date             = { item.fecha_desde           }
                        dateTo           = { item.fecha_hasta           }
                        totalPlayers     = { item.jugadores             }
                        confirmedPlayers = { item.jugadores_confirmados }
                    />
                    <GameItemBody 
                        game={item}
                    />                    
                </View>
            </View>
        </TouchableOpacity>
        <Footer
            onAdd = { onAdd }
            user  = { item.jugador_seudonimo }
            onViewProfile = {onViewProfile}
         />
    </View>
    
);

const styles = StyleSheet.create({
    root : {
        flex : 1,
        marginVertical : 5,
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
    user        : PropTypes.string,
    onViewProfile : PropTypes.func,
};

export default Item;