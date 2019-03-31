import React from 'react';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { MyGamesComponent } from "../../components";
import { FabButton } from '../../commons';
import { withSession } from '../../providers';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyGamesScreen extends React.PureComponent {
    render() {
        const {sessionStack, navigation} = this.props;    
        return (
            <BaseScreen navigation={navigation} title={"Mis juegos"}>
                <MyGamesComponent navigation={navigation}/>
                {sessionStack.crearJuego && (
                    <FabButton 
                        icon = "plus"
                        onPress = {() => navigation.navigate("CreateGame", {prevRoute : "MyGames"})}
                    />
                )}          
            </BaseScreen>
        );
    }
}

MyGamesScreen.propTypes = {
    navigation : PropTypes.object,
    sessionStack : PropTypes.object,
};

export default withSession(MyGamesScreen);