import React from 'react';
import PropTypes from 'prop-types';
import MainAppBar from "./MainAppBar";

/**
 * This component allows to use the same structure or layout for every that uses.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param navigation
 * @param children
 * @param title
 * @param header
 * @returns {*}
 * @constructor
 */
const BaseScreen = ({navigation, children, title, header=true}) => (
    <>
        {header && (
            <MainAppBar
                navigation  = {navigation}
                title       = {title}
            />
        )}
        {children}
    </>
);
BaseScreen.propTypes = {
    navigation  : PropTypes.object.isRequired,
    title       : PropTypes.string,
    header      : PropTypes.bool,
};
export default BaseScreen;