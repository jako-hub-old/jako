import React from 'react';
import PropTypes from 'prop-types';
import {MainAppBar} from "./index";

/**
 * This component allows to use the same structure or layout for every that uses.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param navigation
 * @param children
 * @param title
 * @returns {*}
 * @constructor
 */
const BaseScreen = ({navigation, children, title}) => (
    <>
        <MainAppBar
            navigation  = {navigation}
            title       = {title}
        />
        {children}
    </>
);
BaseScreen.propTypes = {
    navigation  : PropTypes.object.isRequired,
    title       : PropTypes.string,
};
export default BaseScreen;