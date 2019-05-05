import React from 'react';
import BaseScreen from '../BaseScreen';
import { withUserData } from '../../providers';
import FriendshipSuggestion from '../../components/my-profile/friendship-suggestion';


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
                <FriendshipSuggestion 
                    navigation = { navigation } 
                    onlyIfResults
                />
            </BaseScreen>
        );
    }
}

export default withUserData(TestAreaScreen);