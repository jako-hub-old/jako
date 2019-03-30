import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Text,
} from 'native-base';
import PropTypes from 'prop-types';
import Item from './item';

const EmptySet = () => (
    <View style={styles.EmptySet}>
        <Text note>No te encuentras en ningún juego en el momento</Text>
    </View>
);

const ListComponent = (props) => {
    const { games=[], onSelectGame} = props;
    if(games.length === 0) {
        return (<EmptySet />);
    }
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

const styles = StyleSheet.create({
    root : {
        paddingVertical     : 10,
        paddingHorizontal   : 5,
    },
    EmptySet : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "center",
        paddingVertical : 30,
    },
});

ListComponent.propTypes = {
    games : PropTypes.array.isRequired,
    onSelectGame : PropTypes.func,
};

export default ListComponent;