import React from 'react';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import { GameDetailComponent } from '../../components';
import { withSearch } from '../../providers';

class GameDetailScreen extends React.PureComponent {
    
    render() {
        const {
            navigation,
            selectedGame=this.theGame,
        } = this.props;
        return (
            <BaseScreen 
                allowBack
                navigation={navigation} title={selectedGame? selectedGame.nombre : "Nope"}
            >
                {selectedGame && (<GameDetailComponent navigation={navigation} selectedGame={selectedGame} />)}
            </BaseScreen>
        );
    }
}

GameDetailScreen.propTypes = {
    navigation          : PropTypes.object,
    selectedGame        : PropTypes.object,
    onChangeQuery       : PropTypes.func,
    clearSelectedGame   : PropTypes.func,
    setSelectedGame     : PropTypes.func,
};

export default withSearch(GameDetailScreen);