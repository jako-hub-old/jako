import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { withPosts } from '../../providers';
import PostItem from './PostItem';
const TYPE_GAMES = 'JUE';

class News extends React.Component {
    state = {
        loading : false,
    };

    componentDidMount() {
        this.fetchNews();
    }


    fetchNews() {
        this.setState({loading : true});
        this.props.fetchNews()
        .then(response => {
            this.setState({loading : false});
        })
        .catch(response => {
            this.setState({loading : false});
        });
    }

    renderNews() {
        const { news=[] } = this.props;        
        return news.map((item, key) => (
            <PostItem 
                key = { `post-item-${key}-${item.codigo_publicacion}` } 
                item = { item }
            />
        ));
    }

    render() {        
        const { loading } = this.state;
        return (
            <View style = { styles.root }>
                <ScrollView
                    refreshControl  = {(
                        <RefreshControl 
                            refreshing = { loading   }
                            onRefresh  = { () => this.fetchNews() }
                        />
                    )}
                >
                    {this.renderNews()}
                </ScrollView>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

News.propTypes = {
    navigation : PropTypes.any,
    news        : PropTypes.array,
    fetchNews   : PropTypes.func,
};

export default withPosts(News);