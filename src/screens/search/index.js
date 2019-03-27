import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BaseScreen } from '../../components/commons';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { SearchComponent, SearchFilter } from '../../components';

export {default as GameDetailScreen} from './GameDetail';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyProfileScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen 
                navigation      = {navigation} 
                title           = {false} 
                TitleComponent  = {(<SearchFilter />)}
            >
                <View style={styles.root}>
                    <SearchComponent navigation={navigation} />
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "flex-start",
        flexDirection : "column",
        paddingHorizontal   : 10,
        paddingVertical     : 10,
    },
});

MyProfileScreen.propTypes = {
    navigation : PropTypes.object,
};

export default MyProfileScreen;