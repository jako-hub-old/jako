import React from 'react';
import BaseScreen from '../BaseScreen';
import InviteContacts from '../../components/invite-contacts';
import { PrettyButton } from '../../commons/forms';

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
                <PrettyButton onPress = {() => this.toggle()}>
                    Open
                </PrettyButton>
                <InviteContacts 
                    open = {open}
                    onClose = {() => this.toggle()}
                />
            </BaseScreen>
        );
    }
}

export default TestAreaScreen;