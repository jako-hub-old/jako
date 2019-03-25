import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    fetchGames, 
    onChangeQueryString, 
    clearSelectedGame,
    selectGame,
    setSelectedGame,
} from '../store/actions/search.actions';
import { startLoading, stopLoading } from '../store/actions/global.actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    clearSelectedGame,
    selectGame,
    setSelectedGame,
    fetchGames,
    startLoading,
    stopLoading,
    onChangeQuery : onChangeQueryString,
}, dispatch);

const mapStateToProps = ({search:{results=[], searchQuery="", viewGameDetail, selectedGame}}) => ({
    results,
    searchQuery,
    viewGameDetail,
    selectedGame,
});

export const propTypes = {
    viewGameDetail      : PropTypes.bool,
    selectedGame        : PropTypes.object,
    results             : PropTypes.array,
    searchQuery         : PropTypes.string,
    fetchGames          : PropTypes.func,
    startLoading        : PropTypes.func,
    stopLoading         : PropTypes.func,
    onChangeQuery       : PropTypes.func,
    clearSelectedGame   : PropTypes.func,
    selectGame          : PropTypes.func,
    setSelectedGame     : PropTypes.func,
};

/**
 * This wrapper allows to interact with the games reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param WrappedComponent
 */
export default WrappedComponent => (connect(mapStateToProps, mapDispatchToProps)(
    class extends React.PureComponent {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            )
        }
    }
));