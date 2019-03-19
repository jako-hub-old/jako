import React from 'react';
import { connect } from 'react-redux';
import { startLoading, stopLoading } from '../store/actions/global.actions';
import { bindActionCreators } from 'redux';

const mapDispatchToProps = dispatch => bindActionCreators({
    startLoading,
    stopLoading,
}, dispatch);

const mapStateToProps = ({global:{loadingState}}) => ({
    loading : loadingState,
});

export default () => WrappedComponent => (connect(mapStateToProps, mapDispatchToProps)(
    props => (
        <WrappedComponent 
            {...props}
        />
    )
));