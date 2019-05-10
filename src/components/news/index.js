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
import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyObject from '../../commons/others/EmptyIcon';

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

    renderEmpty() {
        return (
            <View style = { styles.emptyRoot }>            
                <EmptyObject 
                    message = "Parece que aún no hay actividad en Jako"
                    icon = "newspaper-o" 
                />
            </View>
        );
    }

    renderNews() {
        const { news=[] } = this.props;
        if(news.length === 0) return this.renderEmpty();
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
    emptyRoot : {
        flex : 1,
        alignItems : "center",
        paddingVertical : 20,
    },
});

News.propTypes = {
    navigation : PropTypes.any,
    news        : PropTypes.array,
    fetchNews   : PropTypes.func,
};

export default withPosts(News);