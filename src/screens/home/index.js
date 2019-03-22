import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseScreen } from '../../components/commons';
import PropTypes from 'prop-types';
import { SearchComponent } from '../../components';

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
                    <SearchComponent />
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        paddingHorizontal   : 10,
        paddingVertical     : 10,
        alignItems          : "center",
    },
});

HomeScreen.propTypes = {
    navigation : PropTypes.object,
};

export default HomeScreen;