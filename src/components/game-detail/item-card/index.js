import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Header from '../../game-item-header';
import Content from './Content';
import ImagePreview from './ImagePreview';
import PropTypes from 'prop-types';

/**
 * This component renders the Item presentation
 * @param {*} param0 
 */
const ItemCard = ({game, onAdd}) => {
    return (
        <View style={styles.root}>
            <View style={styles.wrapper}>
                <View style={styles.pictureWrapper}>
                    <ImagePreview />
                </View>
                <View style={styles.infoWrapper}>
                    <Header
                        title            = { game.nombre        }
                        date             = { game.fecha_desde || game.juego_fecha_desde     }
                        dateTo           = { game.fecha_hasta || game.juego_fecha_hasta     }
                        totalPlayers     = { game.jugadores                 }
                        confirmedPlayers = { game.jugadores_confirmados     }
                    />
                    <Content 
                        game={ game}
                    />                    
                </View>
            </View>
        </View>
        
    )
};

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

ItemCard.propTypes = {
    onAdd       : PropTypes.func,
    onComment   : PropTypes.func,
    game        : PropTypes.object,
};

export default ItemCard;