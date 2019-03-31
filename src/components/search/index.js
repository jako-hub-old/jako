import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { withSearch } from '../../providers';
import PropTypes from 'prop-types';
// import Pager from './Pager';
import Results from './Results';
import { LoadingSpinner } from '../../commons';

/**
 * This component handles the items search.
 */
class SearchComponent extends React.Component {
    state = {
        loading : true,
    };
    componentDidMount() {
        this.fetchGames();
    }

    fetchGames() {
        this.setState({loading : true});
        this.props.fetchGames()
            .then(() => this.setState({loading : false,}))
            .catch(() => this.setState({loading : false}));
    }

    /**
     * This function aplies the filters to the search.
     */
    getFilteredList() {
        let elements = [...this.props.results];
        const {searchQuery} = this.props;
        if(searchQuery !== "") {
            elements = elements.filter(item => {
                const regExp = new RegExp(`.*(${searchQuery.toLowerCase()}).*`, "g");
                return `${item.nombre.toLowerCase()}`.match(regExp);
            });
        }
        return elements;
    }

    onSelectResult(item) {
        this.props.selectGame(item);
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("GameDetail", {prevRoute : currentRoute});
    }

    joinToGame(selectedGame) {
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("JoinToGame", {prevRoute : currentRoute, selectedGame});
    }

    refreshGames() {
        this.fetchGames();
    }

    goToCreate() {
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("CreateGame", {prevRoute : currentRoute});
    }

    render() {
        const {
            loading,            
        } = this.state;
        const results = this.getFilteredList() || [];
        return (
            <>
                {loading && (
                    <View style={{flex : 1, alignItems: "center"}}>
                        <LoadingSpinner/>
                    </View>
                )}  
                {!loading && (
                    <Results 
                        results         = { results }
                        onSelectItem    = { this.onSelectResult.bind(this)  }
                        onJoinToGame    = { this.joinToGame.bind(this)      }
                        onRefresh       = { () => this.refreshGames()       }
                        goToCreate      = { () => this.goToCreate()         }
                    />
                )}
            </>
        );
    }
}

SearchComponent.propTypes = {
    results             : PropTypes.array,
    searchQuery         : PropTypes.string,
    fetchGames          : PropTypes.func,
    startLoading        : PropTypes.func,
    stopLoading         : PropTypes.func,
    onChangeQuery       : PropTypes.func,
    clearSelectedGame   : PropTypes.func,
    selectGame          : PropTypes.func,
    setSelectedGame     : PropTypes.func,
    navigation          : PropTypes.object.isRequired,
};

export default withSearch(SearchComponent);