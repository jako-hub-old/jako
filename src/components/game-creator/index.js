import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Form from './Form';

class GameCreatorComponent extends React.Component {
    state = {
        name : "",
        scenario : "",        
    };

    onChange(field, name) {
        this.setState({
            [field] : name,
        });
    }

    render() {
        const {
            name,
            scenario,
        } = this.state;
        return (
            <ScrollView>
                <View style={styles.root}>
                    <Form 
                        onChange = {this.onChange.bind(this)}
                        gameName = { name }
                        scenario = { scenario }
                    />
                    <View>
                        <Text>
                            Teams!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

GameCreatorComponent.propTypes = {
    navigation : PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

export default GameCreatorComponent;