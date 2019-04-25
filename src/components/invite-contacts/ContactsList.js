import React from 'react';
import PropTypes from 'prop-types';
import { 
    View, 
    Text, 
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    CheckBox,
} from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import Contacts from 'react-native-contacts';
import PermissionsManager, { READ_CONTACTS } from '../../commons/permissions-manager';
import { addMessage } from '../../utils/functions';
import { DEFAULT_USER_IMG } from 'react-native-dotenv';
import SelectButton from './SelectButton';
import Filter from './Filter';

/**
 * This component renders a list of contacts.
 */
class ContactsList extends React.Component {
    state = {
        contacts : [],        
        selectedContacts : [],
    };

    permissions = [
        READ_CONTACTS,
    ];

    componentDidMount() {
        //this.getContacts();
    }

    getContacts() {
        Contacts.getAll((err, contacts) => {
            if(err) {
                addMessage("Error al leer los contactos");
            } else {
                this.setState({
                    contacts,
                });
            }
        });
    }

    emptyContacts() {
        return (
            <View style = { styles.emptyList }>
                <Text note style = { styles.emptyText }>No hay contactos que mostrar</Text>
            </View>
        );
    }

    onValidatePermissions() {
        this.getContacts();
    }

    onSelectContact({recordID, selected}) {
        this.setState(({contacts}) => ({
            contacts : contacts.map(contact => {
                if(contact.recordID === recordID) contact.selected = !selected;
                return contact;
            }),
            selectedContacts : contacts.filter(item => item.selected),
        }));
    }

    getFilteredContacts() {
        const {contacts=[], filter} = this.state;
        let filteredContacts = [...contacts];
        if(filter) {
            filteredContacts = filteredContacts.filter(item => {
                const regExp = new RegExp(`.*(${filter.toLowerCase()}).*`, "g");
                return `${item.givenName.toLowerCase()}`.match(regExp);
            });
        }
        return filteredContacts;
    }

    renderList() {
        const contacts = this.getFilteredContacts();
        return (
            <>
            <ScrollView style = { styles.scrollView }>
                <List style = { styles.listItem }>
                    {contacts.map((contact, key) => (
                        <ListItem 
                            key = { `contact-item-${key}` } 
                            noIndent
                            thumbnail
                            button
                            onPress = { () => this.onSelectContact(contact) }
                        >
                            <Left style = { styles.thumbnailWrapper }>
                                <Thumbnail 
                                    style = { styles.thumbnail }
                                    source = { { uri : contact.hasThumbnail? contact.thumbnailPath : DEFAULT_USER_IMG }} 
                                />
                            </Left> 
                            <Body style = { styles.bodyWrapper }>
                                <Text>{contact.givenName}</Text>
                            </Body>
                            <Right style = { styles.buttonWrapper }>
                                <View>
                                    <CheckBox 
                                        onPress = { () => this.onSelectContact(contact) }
                                        checked = { contact.selected } 
                                    />
                                </View>
                            </Right>
                        </ListItem>
                    ))}
                </List>
            </ScrollView>            
            </>
        );
    }

    onChangeFilter(filter) {
        this.setState({
            filter : filter || "",
        });
    }

    onClear() {
        this.setState({
            filter : "",
        });
    }

    onSelectContacts() {
        const {onSelectContacts} = this.props;
        const {
            selectedContacts
        } = this.state;
        if(onSelectContacts) {
            onSelectContacts(selectedContacts);
        }
    }

    render() {
        const { contacts=[], selectedContacts=[], filter, } = this.state;        
        const totalContacts = contacts.length;
        const addedContacts = selectedContacts.length;        
        const rootStyles = [styles.root, (addedContacts > 0? styles.rootPadding : {})];
        return (
            <PermissionsManager  
                permissions = { this.permissions } 
                onValidatePermissions = { () => this.onValidatePermissions() }
            >
                <>
                    <View style = { rootStyles } >
                        <View style = { styles.header }>
                            <Text>Tus contactos</Text>
                        </View>
                        <Filter 
                            value = { filter } 
                            onChange = { this.onChangeFilter.bind(this) } 
                            onClear = { () => this.onClear() }
                        />
                        { totalContacts === 0 && (this.emptyContacts())     }
                        { totalContacts > 0 && (this.renderList(contacts))  }
                        { addedContacts > 0 && 
                        (<SelectButton 
                            selected = {addedContacts} 
                            onSelect = { () => this.onSelectContacts() }
                            />) 
                        }
                    </View>                    
                </>
            </PermissionsManager>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,        
    },
    rootPadding : {
        paddingBottom : 80,
    },
    header : {
        flexDirection : "row",
        paddingVertical : 10,
        justifyContent : "center",
    },
    emptyList : {
        flexDirection : "row",
        justifyContent : "center",
        paddingTop : 20,
        marginTop : 10,
    },
    emptyText : {
        textAlign : "center",
    },
    thumbnail : {
        width : 50,
        height : 50,
        backgroundColor : "#e0e0e0",
    },
    listItem : {
        padding : 0,
    },
    thumbnailWrapper : {
        flex : 2,
    },
    bodyWrapper : {
        flex : 10,
    },
    buttonWrapper : {
        flex : 2,
        paddingRight : 30,
        justifyContent : "flex-start"
    },
    scrollView : {
        paddingBottom : 40,
    },
});

ContactsList.propTypes = {
    onSelectContacts : PropTypes.func,    
};

export default ContactsList;