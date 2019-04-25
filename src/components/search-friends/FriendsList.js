import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    View,
    Text,
    Thumbnail,
} from 'native-base';
import { DEFAULT_USER_IMG } from 'react-native-dotenv';
import { IconButton } from '../../commons/forms';
import { FriendshipButton } from '../../commons/buttons';

const FriendCard = ({friend, onViewProfile, onRequest, sended, onCancel}) => (
    <View style = {styles.friendCard}>
        <View style = {styles.avatar}>
            <TouchableOpacity onPress = {onViewProfile}>
                <Thumbnail
                    style = {styles.thumbnail}
                    source = {{uri : friend.foto? friend.foto : DEFAULT_USER_IMG}}
                />
            </TouchableOpacity>            
        </View>
        <View style = { styles.body }>
            <TouchableOpacity onPress = {onViewProfile}>
                <Text>{friend.nombre_corto}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {onViewProfile}>
                <Text note>{friend.seudonimo}</Text>
            </TouchableOpacity>
        </View>
        <View style = { styles.right }>
            {/* <IconButton onPress = { onRequest } icon = "user-plus"  /> */}
            {!sended && (
                <FriendshipButton 
                    asIcon
                    playerCode={friend.codigo_jugador} 
                />
            )}
            {sended && (
                <IconButton 
                    icon = "times"
                    onPress = {() => onCancel? onCancel(friend) : null}
                />
            )}
        </View>
    </View>
)

const FriendsList = ({friends=[], onViewProfile, onRequestFriendship, sendedRequest, onCancel}) => (
    <View style = { styles.root }>
        {friends.map((friend, key) => {            
            const request = sendedRequest(friend.codigo_jugador);
            const sended = Boolean(request);
            return (
                <FriendCard 
                    key     = {`friend-list-item-${key}`}
                    friend  = {friend}
                    onViewProfile = { () => onViewProfile(friend) }
                    onRequest = {() => onRequestFriendship(friend)}
                    sended = {sended}
                    onCancel = {onCancel}
                />
            )
        })}
    </View>
);

const styles = StyleSheet.create({
    root : {

    },
    friendCard : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
        padding : 10,
    },
    avatar : {
        justifyContent : "center",
        alignItems : "center",
        flex : 2,        
    },
    body : {
        flex : 10,
        justifyContent : "center",
    },
    right : {
        flex : 2,
        justifyContent : "center",
    },
    thumbnail : {
        width : 40,
        height : 40,
        backgroundColor : "#e0e0e0",
    },
});

FriendsList.propTypes = {
    friends : PropTypes.array,
    onViewProfile : PropTypes.func,
    sendedRequest : PropTypes.func,
    onCancel : PropTypes.func,
};

export default FriendsList;