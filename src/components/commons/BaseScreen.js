import React from 'react';
import PropTypes from 'prop-types';
import {MainAppBar} from "./index";

/**
 * This component allows to use the same structure or layout for every that uses.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param navigation
 * @param children
 * @returns {*}
 * @constructor
 */
const BaseScreen = ({navigation, children}) => (
    <>
        <MainAppBar
            navigation={navigation}
        />
        {children}
    </>
);
BaseScreen.propTypes = {
    navigation : PropTypes.object.isRequired,
};
export default BaseScreen;