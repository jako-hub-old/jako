import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { SearchComponent, SearchFilter } from '../../components';
import { FabButton } from '../../commons';
import { withSession } from '../../providers';

export {default as GameDetailScreen} from './GameDetail';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyProfileScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        const {crearJuego} = this.props.sessionStack;
        return (
            <BaseScreen 
                navigation      = {navigation} 
                title           = {false} 
                TitleComponent  = {(<SearchFilter />)}
            >
                <View style={styles.root}>
                    <SearchComponent navigation={navigation} />
                </View>
                {crearJuego && (
                    <FabButton 
                        icon = "plus"
                        onPress = {() => navigation.navigate("CreateGame", {prevRoute : "Search"})}
                    />
                )}                
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
    sessionStack : PropTypes.object,
};

export default withSession(MyProfileScreen);