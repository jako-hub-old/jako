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
 * @param allowBack
 * @returns {*}
 * @constructor
 */

 class BaseScreen extends React.PureComponent {
     goBack() {
         const {navigation} = this.props;
         const {prevRoute} = navigation.state.params;
         if(prevRoute) {
            navigation.navigate(prevRoute);
         } else {
             navigation.goBack();
         }
     }
     render() {
        const {navigation, allowBack, children, title, header=true, TitleComponent} = this.props;
        return (
            <>
                {header && (
                    <MainAppBar
                        allowBack       = {allowBack}
                        goBack          = {this.goBack.bind(this)}
                        navigation      = {navigation}
                        title           = {title}
                        TitleComponent  = {TitleComponent}
                    />
                )}
                {children}
            </>
        )
     }
 }

BaseScreen.propTypes = {
    navigation  : PropTypes.object.isRequired,
    title       : PropTypes.any,
    header      : PropTypes.bool,
    allowBack   : PropTypes.bool,
    TitleComponent : PropTypes.any,
};
export default BaseScreen;