import React from 'react';
import PropTypes from 'prop-types';
import MainAppBar from "../components/commons/MainAppBar";

const BaseScreen = props => (
    <>
        <MainAppBar
            navigation={props.navigation}
        />
        {props.children}
    </>
);
BaseScreen.propTypes = {
    navigation : PropTypes.object.isRequired,
};
export default BaseScreen;