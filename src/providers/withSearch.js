import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGames } from '../store/actions/search.actions';
import { startLoading, stopLoading } from '../store/actions/global.actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchGames,
}, dispatch);

const mapStateToProps = ({search:{results=[], searchQuery=""}}) => ({
    results,
    searchQuery,
});

export const propTypes = {
    results     : PropTypes.array,
    searchQuery : PropTypes.string,
    fetchGames  : PropTypes.func,
    startLoading: PropTypes.func,
    stopLoading : PropTypes.func,
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