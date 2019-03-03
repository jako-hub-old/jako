import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BaseScreen } from '../../components/commons';
import PropTypes from 'prop-types';

/**
 * This is the main or home screen for the application.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class HomeScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen navigation={navigation}>
                <View style={styles.root}>
                    <Text>This is the application home</Text>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        paddingHorizontal   : 10,
        paddingVertical     : 10,
    },
});

HomeScreen.propTypes = {
    navigation : PropTypes.object,
};

export default HomeScreen;