import React from 'react';
import BaseScreen from '../BaseScreen';
import { withUserData } from '../../providers';
import FriendshipSuggestion from '../../components/my-profile/friendship-suggestion';
import ContactsList from '../../components/invite-contacts/ContactsList';


class TestAreaScreen extends React.Component {
    state = {
        open : false,
    };
    toggle() {
        this.setState({
            open : !this.state.open,
        });
    }
    render() {
        const navigation = this.props.navigation;
        const {open} = this.state;
        return (
            <BaseScreen
                navigation = { navigation }
            >
                <ContactsList enabledFormAdd  onSelectContacts = { (contacts) => console.log(contacts)} />
            </BaseScreen>
        );
    }
}

export default withUserData(TestAreaScreen);