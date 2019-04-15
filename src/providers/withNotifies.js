import React from 'react';
import { connect } from 'react-redux';
import { addNotify, removeNotify, popNotify, viewNotify} from '../store/actions/global.actions';
import { selectGame } from '../store/actions/search.actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import uuid from 'react-native-uuid';

const mapDispatchToProps = dispatch => bindActionCreators({
    addNotify,
    removeNotify,
    popNotify,
    viewNotify,
    selectGame,
}, dispatch);

const mapStateToProps = ({global:{notifications=[]}}) => ({
    notifications,
});

export const propTypes = {
    notify          : PropTypes.func,
    removeNotify    : PropTypes.func,
    popNotify       : PropTypes.func,
    notifies        : PropTypes.arrayOf(PropTypes.shape({
        id          : PropTypes.any,
        title       : PropTypes.string,
        body        : PropTypes.string,
    })),
    viewNotify      : PropTypes.func,
    selectGame      : PropTypes.func,
};

export default WrappedComponent => (connect(mapStateToProps, mapDispatchToProps)(
    class extends React.PureComponent {
        addNotify(notify) {
            notify.id = uuid.v1();
            this.props.addNotify(notify);
        }
        render() {
            return (
                <WrappedComponent 
                    {...this.props}
                    notify = { notify => this.addNotify(notify) }
                />
            )
        }
    }
));