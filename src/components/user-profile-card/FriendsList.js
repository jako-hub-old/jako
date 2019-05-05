import React from 'react';
import PropTypes from 'prop-types';
import {
    Body,
    Left,
    View,
    Text,
    List,
    ListItem,
    Thumbnail,    
} from 'native-base';
import { 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { DEFAULT_USER_IMG, IMAGES_SERVER }   from 'react-native-dotenv';
import { LoadingSpinner } from '../../commons/loaders';
import FriendshipSuggestion from '../my-profile/friendship-suggestion';

class FriendsList extends React.PureComponent {
    componentDidMount() {
        if(this.props.fetchFriends) {
            this.props.fetchFriends();
        }
    }

    renderLoader() {
        return (
            <View style = { styles.root }>
                <View styles = { styles.loader }>
                    <LoadingSpinner />
                </View>
            </View>
        );
    }

    renderEmpty() {
        const navigation = this.props.navigation;
        return (            
            <>
                <View style = { styles.root }>
                    <Text note style = { { textAlign : "center", marginTop: 15 } }>
                        {"Aún no tiene contactos"}                
                    </Text>
                </View>
                <FriendshipSuggestion small navigation = { navigation } onlyIfResults />
            </>
        );
    }
    
    render() {
        const { 
            loading,
            friends = [],
            onViewProfile,
        } = this.props;

        if(loading) return this.renderLoader();
        if(friends.length === 0) return this.renderEmpty();
        return (
            <View style = { styles.root }>                
                <View style = { styles.header }>
                    <Text style = { styles.headerText }>Mis amigos</Text>
                </View>
                <List>
                    {friends.map((friend, key) => (
                        <ListItem 
                            key = {`friend-list-item-${friend.codigo_jugador_amigo_pk}`}
                            noBorder
                            noIndent
                            note
                            avatar
                        >
                            <Left>
                                <Thumbnail source = { {uri : friend.foto? `${IMAGES_SERVER}${friend.foto}` : DEFAULT_USER_IMG} }/>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress = { () => onViewProfile(friend)}>
                                    <Text>{friend.jugador_amigo_rel_nombre_corto}</Text>
                                </TouchableOpacity>
                                <Text note>({friend.seudonimo})</Text>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        paddingBottom : 20,
    },
    loader : {
        flex : 1, 
        justifyContent : "center",
        alignItems : "center",
    },
    header : {
        backgroundColor : "#f7f7f7",
        padding         : 15,
    },
    headerText : {
        textAlign : "center",
        color : "#707070",
    },
});

FriendsList.propTypes = {
    loading         : PropTypes.bool,
    fetchFriends    : PropTypes.func,
    friends         : PropTypes.arrayOf(PropTypes.shape({
        jugador_amigo_rel_nombre_corto  : PropTypes.string,
        codigo_jugador_amigo            : PropTypes.any,
        codigo_jugador_amigo_pk         : PropTypes.any,
    })),
    onViewProfile : PropTypes.func,
    navigation : PropTypes.any,
};

export default FriendsList;