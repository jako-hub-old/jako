import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import GameItem from './GameItem';

class ListComponent extends React.PureComponent {
    render() {
        const { games=[] } = this.props;
        return (
            <ScrollView>
                <View style={styles.root}>
                    {games.map((item, key) => (
                        <GameItem
                            key={`my-games-item-${key}`}
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
};

export default ListComponent;