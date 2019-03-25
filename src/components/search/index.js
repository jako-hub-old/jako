import React from 'react';
import {
    Text,
} from 'react-native';
import { withSearch } from '../../providers';
import PropTypes from 'prop-types';
import Filter from './Filter';
// import Pager from './Pager';
import Results from './Results';

/**
 * This component handles the items search.
 */
class SearchComponent extends React.Component {
    state = {
        loading : true,
    };
    componentDidMount() {
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

    render() {
        const {
            loading,            
        } = this.state;
        const {
            onChangeQuery,
            searchQuery,
        } = this.props;
        const results = this.getFilteredList() || [];
        return (
            <>
                {loading && (<Text>Buscando juegos...</Text>)}                
                <Filter 
                    onChange = { text => onChangeQuery(text) }
                    value    = { searchQuery }
                />                
                <Results 
                    results         = { results }
                    onSelectItem    = { this.onSelectResult.bind(this) }
                />
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