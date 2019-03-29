import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import GameItem from './GameItem';
import Item from './item';

class ListComponent extends React.PureComponent {
    render() {
        const { games=[], onSelectGame} = this.props;
        return (
            <ScrollView>
                <View style={styles.root}>
                    {Array.isArray(games) && games.map((item, key) => (
                        <Item
                            item        = {item}
                            key={`my-games-item-${key}`}
                            onSelect = {() => onSelectGame? onSelectGame(item) : null}
                        />
                    ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        paddingVertical     : 10,
        paddingHorizontal   : 5,
    },
});

ListComponent.propTypes = {
    games : PropTypes.array.isRequired,
    onSelectGame : PropTypes.func,
};

export default ListComponent;