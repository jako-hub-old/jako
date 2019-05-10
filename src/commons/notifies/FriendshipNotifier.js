import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, } from 'react-native';
import {
    View,
    Text,    
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SimpleTouch } from '../touchables';
import { withUserData } from '../../providers';
import { ModalTop } from '../modals';
import FriendshipRequestsReceived from '../../components/my-profile/friendship-requests-received';
import { IconButton } from '../forms';

class FriendshipNotifier extends React.Component {
    state = {
        openModal : false,
        totalRequests : 0,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {        
        await this.props.fetchFriendshipRequest();
    };

    toggleModal = () => {
        this.setState({
            openModal : !this.state.openModal,
        });
    };

    renderModal = () => {
        const { navigation, } = this.props;
        return (
            <ModalTop
                open
                onClose = { () => this.toggleModal() }
                title = "Mi comunidad" 
                icon = "users"
            >
                <View style = { styles.notifiesRoot }>
                    <FriendshipRequestsReceived 
                        navigation = { navigation }
                        onViewProfile = { () => this.toggleModal() }
                    />
                </View>
            </ModalTop>
        );
    }

    render () {
        const { friendshipRequests=[] } = this.props;
        const {openModal} = this.state;
        const totalRequests = friendshipRequests.length;
        return (
            <>
                <SimpleTouch onPress = { () => this.toggleModal() }>
                    <View style = { styles.root }>
                        <Icon style = { styles.iconButton } name = "users" size = { 24 } />
                        {totalRequests > 0 && (
                            <View style = { styles.tipCount }>
                                <Text style = { styles.tipText }>{totalRequests}</Text>
                            </View>
                        )}                    
                    </View>                
                </SimpleTouch>
                {openModal && (this.renderModal())}
            </>
            
        );
    }
}

const styles = StyleSheet.create({
    root : {
        height : 30,
        width : 30,
        justifyContent : "center",
        alignItems : "center",
    },
    tipCount : {
        backgroundColor : "red",
        position : "absolute",
        top : "70%",
        right : "60%",
        paddingHorizontal : 2,
        width : 30,
        borderRadius : 30,
    },
    tipText : {
        textAlign : "center",        
        color : "#FFF",
    },
    iconButton : {
        //color : "#FFF",
    },
});

FriendshipNotifier.propTypes = {
    fetchMyFriends      : PropTypes.func,
    userCode            : PropTypes.any,
    setUserData         : PropTypes.func,
    friends             : PropTypes.array,
    photo               : PropTypes.string,
    verified            : PropTypes.bool,
    setVerified         : PropTypes.func,
    friendshipRequests  : PropTypes.array,
    friendshipRequestsSended    : PropTypes.array,
    fetchUserSendedRequests     : PropTypes.func,
    fetchFriendshipRequest      : PropTypes.func,
    removeFriendshipRequest     : PropTypes.func,
};

export default withUserData(FriendshipNotifier);