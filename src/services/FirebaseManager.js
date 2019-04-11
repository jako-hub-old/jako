import React from 'react';
import PropTypes from 'prop-types';
import { withSession } from '../providers';
import firebase from 'react-native-firebase';

class FirebaseManager extends React.PureComponent {

    componentDidMount() {
        alert("hello world!");
    }

    componentWillUnmount() {
    }
    

    render () {
        const {children} = this.props;
        return (
            <>
                {children}
            </>
        );
    }
}

FirebaseManager.propTypes = {
    sessionWrite        : PropTypes.func,
    sessionWriteAll     : PropTypes.func,
    sessionStack        : PropTypes.object,
};

export default withSession(FirebaseManager);