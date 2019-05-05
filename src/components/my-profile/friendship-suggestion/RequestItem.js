import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    ListItem,
    Left,
    Body,
    Thumbnail,
    Right,
    Text,
    View,
} from 'native-base';
import {SimpleTouch} from '../../../commons/touchables';
import {IMAGES_SERVER, DEFAULT_USER_IMG} from 'react-native-dotenv';
import { FriendshipButton } from '../../../commons/buttons';

const MAX_CHARS = 16;

/**
 * This component renders only the items presentation.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const RequestItem = ({suggestion, onRequestDone, onViewProfile}) => {
    const {
        foto,
        jugador_nombre_corto:short_name,
        jugador_seudonimo:alias,
        codigo_jugador:playerCode
    } = suggestion;
    const displayName = short_name.length > MAX_CHARS? short_name.substring(0, MAX_CHARS) + '...' : short_name;
    return (
        <View style = { styles.listItem } noBorder>
            <View style = { styles.listItemAvatar }>
                <SimpleTouch
                    wrapType = "stretch"
                    onPress = { onViewProfile }
                >
                    <Thumbnail 
                        source = { {uri : foto? `${IMAGES_SERVER}${foto}` : DEFAULT_USER_IMG} } 
                        style = { [styles.listPhoto, styles.thumbWrapper] }
                    />
                </SimpleTouch>
            </View>
            <View style = { styles.listItemBody }>
                <SimpleTouch wrapType = "stretch" onPress = { onViewProfile }>
                    <Text style = { {textAlign : "center"} }>{displayName}</Text>
                </SimpleTouch>
                <SimpleTouch wrapType = "stretch" onPress = { onViewProfile }>
                    <Text note style = { {textAlign : "center"} } >{alias}</Text>
                </SimpleTouch>
            </View>
            <View style = { styles.listItemActions }>
                <FriendshipButton 
                    playerCode = { playerCode } 
                    onRequestDone = { onRequestDone }
                    label = "Enviar"
                    sm
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    thumbWrapper : {
        backgroundColor : "#e0e0e0",
    },
    listPhoto : {
        width : 50,
        height : 50,
    },
    listItem : {
        width : 150,
        flexDirection : "column",
        alignItems : "center",
        paddingVertical : 5,
    },
    listItemActions : {
        flex            : 1,
        flexDirection   : "row",
        justifyContent  : "center",
        alignItems      : "center",
    },
    listItemBody : {
        alignItems : "center",
        marginBottom : 5,
    },
    listItemAvatar : {
    },
    listItemActionIcon : {
        marginHorizontal : 5,
    },
});

RequestItem.propTypes = {
    request : PropTypes.shape({
        foto                    : PropTypes.string,
        jugador_nombre_corto    : PropTypes.string,
        jugador_seudonimo       : PropTypes.string,
    }),
    onRequestDone : PropTypes.func,
};

export default RequestItem;