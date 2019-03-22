import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Container,
} from 'native-base';
import { withSearch } from '../../providers';
import PropTypes from 'prop-types';
import Filter from './Filter';

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

    render() {
        const {
            loading,            
        } = this.state;
        return (
            <>
                {loading && (<Text>Buscando juegos...</Text>)}                
                <Filter />
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
    results     : PropTypes.array,
    searchQuery : PropTypes.string,
    fetchGames  : PropTypes.func,
    startLoading: PropTypes.func,
    stopLoading : PropTypes.func,
};

export default withSearch(SearchComponent);