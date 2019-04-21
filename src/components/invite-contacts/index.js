import React from 'react';
import PropTypes from 'prop-types';
import { SimpleModal } from '../../commons/modals';
import { Text, } from 'native-base';
import ContactList from './ContactsList';
class InviteContacts extends React.PureComponent {
    onSelectContacts(contacts) {
        
    }
    render() {
        const { open, onClose, } = this.props;
        return(
            <SimpleModal
                open    = { open    }
                onClose = { onClose }
                disableScroll
            >
                <ContactList 
                    onSelectContacts = { contacts => this.onSelectContacts(contacts) }
                />
            </SimpleModal>
        )
    }
}

InviteContacts.propTypes = {
    open    : PropTypes.bool.isRequired,
    onClose : PropTypes.func,
};

export default InviteContacts;