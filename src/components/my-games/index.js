import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
    Container,
    Text,
    Tab,
    Tabs,
} from 'native-base';
import {_t} from "../../configs/dictionary";
import stylesPalette from "../../utils/stylesPalette";
import ListMyGamesComponent from './my-games-list';
import {withGames, withSearch} from "../../providers";

/**
 * This component allows to handle the user games
 * @author Jorge Alejandro Quiroz Serna
 */
class MyGamesComponent extends React.Component {
    state = {
        currentTab : 0,
        games : [],
    };
    componentDidMount() {
        this.fetchGames();
    }

    /**
     * This function request the user games to the API.
     */
    fetchGames() {
        this.props.fetchMyGames(this.props.userCode);
    }

    /**
     * This function send the user to see a game detail.
     *
     * @param {*} selectedGame
     * @memberof MyGamesComponent
     */
    onSelectGame(selectedGame) {
        this.props.selectGame(selectedGame);
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("GameDetail", {prevRoute : currentRoute});
    }

    render() {
        const { myGames=[] } = this.props;
        return (
            <Container>
                <ListMyGamesComponent
                    games        = { myGames }
                    onSelectGame = { this.onSelectGame.bind(this) }
                />
            </Container>
        );
    }
}

const palette = stylesPalette();
const styles = StyleSheet.create({
    tab : {
        backgroundColor : palette.primary.color,
    },
    tabActive : {
        backgroundColor : palette.primary.color,
    },
});

MyGamesComponent.propTypes = {
    navigation      : PropTypes.object.isRequired,
    fetchMyGames    : PropTypes.func,
    myGames         : PropTypes.array,
    userCode        : PropTypes.any,
};

export default withGames(withSearch(MyGamesComponent));