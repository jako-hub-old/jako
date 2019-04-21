import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { withSearch } from '../../providers';
import FriendsList from './FriendsList';

class SearchFriends extends Component {
    state = {
        loading : true,
    };
    componentDidMount() {
        this.fetchFriends();
    }

    fetchFriends() {
        this.setState({
            loading : true,
        });
        this.props.fetchFriends()
            .then(() => {
                this.setState({ loading : false });
            })
            .catch(() => {
                this.setState({ loading : false });
            })
    }

    onRefresh() {
        this.fetchFriends();
    }

    renderEmpty() {
        return (
            <View style = { styles.emptyRoot }>
                <Text note style = { {textAlign : "center"} }> No hay amigos que mostrar </Text>
            </View>
        );
    }

    getFilteredFriends() {
        const {resultsFriends, searchQuery} = this.props;
        let filteredData = [...resultsFriends];
        if(searchQuery) {
            filteredData = filteredData.filter(item => {
                const regExp = new RegExp(`.*(${searchQuery.toLowerCase()}).*`, "g");
                return `${item.nombre_corto.toLowerCase()}`.match(regExp) || `${item.seudonimo.toLowerCase()}`.match(regExp);
            });
        }
        return filteredData;
    }

    onRequestFriendship(friend) {
        alert("request!");
    }

    onViewProfile({seudonimo:playerAlias, codigo_jugador:playerCode}) {
        const {navigation} = this.props;
        navigation.navigate("PlayerProfile", {playerCode, playerAlias});
    }

    render() {
        const { loading } = this.state;
        const resultsFriends = this.getFilteredFriends();
        const totalFriends = resultsFriends.length;
        return (
            <ScrollView
                refreshControl = {
                    <RefreshControl 
                        refreshing = { loading }
                        onRefresh = { () => this.onRefresh() }
                    />
                }
            >
                {totalFriends === 0 && this.renderEmpty() }
                {totalFriends > 0 && (
                    <FriendsList 
                        friends = {resultsFriends}
                        onViewProfile = {this.onViewProfile.bind(this)}
                        onRequestFriendship = {this.onRequestFriendship.bind(this)}
                    />
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    root : {},
    emptyRoot : {
        paddingVertical : 20,
    },
});

SearchFriends.propTypes = {
    fetchFriends        : PropTypes.func,
    resultsFriends      : PropTypes.array,
    searchQuery         : PropTypes.string,
    navigation          : PropTypes.any,
};

export default withSearch(SearchFriends);