import React from 'react';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { MyGamesComponent } from "../../components";
import { FabButton } from '../../commons';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyGamesScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen navigation={navigation} title={"Mis juegos"}>
                <MyGamesComponent navigation={navigation}/>
                <FabButton 
                    icon = "plus"
                    onPress = {() => navigation.navigate("CreateGame", {prevRoute : "MyGames"})}
                />
            </BaseScreen>
        );
    }
}

MyGamesScreen.propTypes = {
    navigation : PropTypes.object,
};

export default MyGamesScreen;