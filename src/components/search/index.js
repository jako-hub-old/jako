import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {

} from 'native-base';
import { withSearch } from '../../providers';
import PropTypes from 'prop-types';

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
            <View>
                <Text>
                    {loading && "Buscando juegos..."}
                </Text>
            </View>
        );
    }
}

SearchComponent.propTypes = {
    results     : PropTypes.array,
    searchQuery : PropTypes.string,
    fetchGames  : PropTypes.func,
    startLoading: PropTypes.func,
    stopLoading : PropTypes.func,
};

export default withSearch(SearchComponent);