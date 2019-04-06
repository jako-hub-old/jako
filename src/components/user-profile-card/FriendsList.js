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
import { DEFAULT_USER_IMG }   from 'react-native-dotenv';
import { LoadingSpinner } from '../../commons/loaders';

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
    
    render() {
        const { 
            loading,
            friends = [],
            onViewProfile,
        } = this.props;

        if(loading) return this.renderLoader();
        
        return (
            <View style = { styles.root }>
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
                                <Thumbnail source = { {uri : friend.foto || DEFAULT_USER_IMG} }/>
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
    },
    loader : {
        flex : 1, 
        justifyContent : "center",
        alignItems : "center",
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
};

export default FriendsList;