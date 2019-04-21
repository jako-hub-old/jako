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

const FriendCard = ({friend, onViewProfile, onRequest}) => (
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
            <FriendshipButton 
                asIcon
                playerCode={friend.codigo_jugador} 
            />
        </View>
    </View>
)

const FriendsList = ({friends=[], onViewProfile, onRequestFriendship}) => (
    <View style = { styles.root }>
        {friends.map((friend, key) => {            
            return (
                <FriendCard 
                    key     = {`friend-list-item-${key}`}
                    friend  = {friend}
                    onViewProfile = { () => onViewProfile(friend) }
                    onRequest = {() => onRequestFriendship(friend)}
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
};

export default FriendsList;