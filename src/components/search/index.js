import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import { withSearch } from '../../providers';
import PropTypes from 'prop-types';
import Filter from './Filter';
import Pager from './Pager';
import Results from './Results';

class SearchComponent extends React.Component {
    state = {
        loading : true,
    };
    componentDidMount() {
        this.props.fetchGames()
            .then(response => {
                this.setState({
                    loading : false,
                });
            })
            .catch(response => {
                this.setState({
                    loading : false,
                });
            });
    }

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
                    onChange = {text => onChangeQuery(text)}
                    value    = {searchQuery}
                />
                <Pager 
                    total={results.length}
                />
                <Results 
                    results={results}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "center",
    },
});

SearchComponent.propTypes = {
    results         : PropTypes.array,
    searchQuery     : PropTypes.string,
    fetchGames      : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    onChangeQuery   : PropTypes.func,
};

export default withSearch(SearchComponent);