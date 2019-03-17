import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetchMyGames} from "../store/actions/game.actions";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMyGames,
}, dispatch);

const mapStateToProps = ({games={}}) => ({
    myGames : games.myGames,
});

export const propTypes = {
    fetchMyGames    : PropTypes.func,
    myGames         : PropTypes.array,
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