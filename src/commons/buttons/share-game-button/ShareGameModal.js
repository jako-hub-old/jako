import React from 'react';
import PropTypes from 'prop-types';

import {
    Modal,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {
    List,
    ListItem,
    Left,
    Body,
    Right,
    CheckBox,
    Text,
    View,
    Thumbnail,
} from 'native-base';
import { CommonTabs } from '../../others';
import { withUserData, withApi } from '../../../providers';
import {DEFAULT_USER_IMG} from 'react-native-dotenv';
import { addMessage } from '../../../utils/functions';
import { PrettyButton } from '../../forms';
import ContactsList from '../../../components/invite-contacts/ContactsList';
import endpoints from '../../../configs/endpoints';


const ContactItem = ({contact, onSelectContact, registered, nameLabel}) => (
    <ListItem         
        noIndent
        thumbnail
        button
        onPress = { () => !registered? onSelectContact(contact) : null }
    >
        <Left style = { styles.thumbnailWrapper }>
            <Thumbnail 
                style = { styles.thumbnail }
                source = { { uri : contact.hasThumbnail? contact.thumbnailPath : DEFAULT_USER_IMG }} 
            />
        </Left> 
        <Body style = { styles.bodyWrapper }>
            <Text>{contact[nameLabel]}</Text>
        </Body>
        <Right style = { styles.buttonWrapper }>
            <View>
                {registered
                ? (<Text>Registrado</Text>)
                : (
                    <CheckBox 
                        onPress = { () => onSelectContact(contact) }
                        checked = { contact.selected } 
                    />
                )}

            </View>
        </Right>
    </ListItem>
);



class ShareGameModal extends React.Component {

    state = {
        loading : false,
        friends : [],
        selectedFriends     : [],
        selectedContacts    : [],
    };

    componentDidMount() {
        const {friends=[], fetchMyFriends, userCode} = this.props;
        this.setState({
            friends : [...friends],
        });
        if(friends.length === 0)  fetchMyFriends(userCode);
    }

    componentWillUnmount() {
        const {open, onClose} = this.props;
        if(open) onClose();
    }

    renderContacts() {
        return (
            <View style = {styles.listRoot}>
                <Text style = { styles.textTitle }>
                    ¿A que contacto quieres hablarle de Jako?
                </Text>
                <ContactsList 
                    onSelectContacts = { this.onSelectContacts.bind(this) }
                />
            </View>
        );
    }

    onSelectContacts(contacts=[]) {
        this.props.onClose();
    }

    async inviteFriends() {
        const {game, doPost, onClose, startLoading, stopLoading, userCode} = this.props;
        const { codigo_juego,  } = game;
        const {selectedFriends} = this.state;
        const jugadores = selectedFriends.map(item => item.codigo_jugador_amigo);
        this.setState({selectedFriends : [], friends :[]});
        const data = {
            juego : codigo_juego,
            jugadores,
        };        
        try {
            startLoading();            
            const response = await doPost(endpoints.juego.invitar, data);
            await this.props.fetchMyFriends(userCode);
            const { error, error_controlado } = response;            
            if(response === true) {
                addMessage("Se ha enviado la invitación a tus amigos.");
            } else if(error || error_controlado) {
                addMessage("Ocurrió un error invitar a tus amigos");
                console.log("Error, controlado: ", response, error, error_controlado);
            } else {
                addMessage("Se ha enviado la invitación a tus amigos.");
            }
        } catch (err) {
            console.log("Error catch: ", err);
            addMessage("Ocurrió un error invitar a tus amigos");
        } finally {
            stopLoading();
            onClose();
        }
    }

    async refreshMyFriends() {
        const {userCode, fetchMyFriends} = this.props;
        this.setState({loading : true});
        const response = await fetchMyFriends(userCode);
        const {error, error_controlado} = response;      
        let friends = this.state.friends;
        if(error, error_controlado) {
            addMessage("Error al consultar sus amigos");
        } else {
            friends = [...response];
        }
        this.setState({loading : false, friends});
    }

    onSelectFriend({codigo_jugador_amigo}) {
        const newFriends = this.state.friends.map(item => {
            if(item.codigo_jugador_amigo === codigo_jugador_amigo) {
                item.selected = !item.selected;
            }
            return item;
        });
        this.setState(() => ({
            friends         : newFriends,
            selectedFriends : newFriends.filter(item => item.selected),
        }));
    }

    renderFriends() {
        const {loading, friends=[], selectedFriends=[]} = this.state;
        const total = selectedFriends.length;
        return (
            <>
                <ScrollView
                    refreshControl = {
                        <RefreshControl 
                            refreshing  = { loading }
                            onRefresh   = { () => this.refreshMyFriends() }
                        />
                    }
                >
                    <View style = {styles.listRoot}>
                        <Text style = { styles.textTitle }>
                            Selecciona los amigos a los que deseas compartirles el juego.
                        </Text>
                        <List>
                            {friends.map((item, key) => (
                                <ContactItem 
                                    key     = {`contact-item-list-${key}`}
                                    contact = {item}
                                    onSelectContact = { () => this.onSelectFriend(item) }
                                    nameLabel = "jugador_amigo_rel_nombre_corto"
                                />
                            ))}
                        </List>                    
                    </View>
                </ScrollView>
                {total > 0 && (
                    <View style = {styles.acceptButton}>
                        <PrettyButton onPress = { () => this.inviteFriends() }>
                            Invitar {total}
                        </PrettyButton>
                    </View>
                )}
            </>
        );
    }
    
    render() {
        const {
            open,
            onClose,
        } = this.props;
        return (
            <Modal
                open            = { open    }
                onRequestClose  = { onClose }
            >                
                <CommonTabs 
                    id = {"share-game-tab"}
                    tabs = {[
                        {label : "Amigos", component : this.renderFriends()},
                        {label : "Contactos", component : this.renderContacts()},
                    ]}
                />
            </Modal>
        );
    }
}

const styles = {
    textTitle : {
        textAlign       : "center",
        marginVertical  : 15,
    },
    listRoot : {
        flex : 1,
        paddingBottom : 50,
    },
    acceptButton : {
        position : "absolute",
        bottom : 0,
        flex : 1,
        width : "100%",
        flexDirection : "row",
        justifyContent : "center",
        backgroundColor : "#FFF",
        paddingVertical : 10,
    },
};

ShareGameModal.propTypes = {
    open    : PropTypes.bool,
    onClose : PropTypes.func,
    fetchMyFriends      : PropTypes.func,
    userCode            : PropTypes.any,
    friends             : PropTypes.array,
    game                : PropTypes.any,
    doPost          : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    userCode        : PropTypes.any,
};

export default withUserData(withApi(ShareGameModal));