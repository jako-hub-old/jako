import React from 'react';
import PropTypes from 'prop-types';
import MainAppBar from "./MainAppBar";
import {BackHandler,} from 'react-native';
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

 const mainRoutes = [
     'Home', 'MyGames', 'Search', 'Profile',
 ];

 class BaseScreen extends React.PureComponent {
     componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            this.goBack();
            return this.isMainScreen();
        });
     }

     isMainScreen() {
        const currentRoute = this.props.navigation.state.routeName;
        if(mainRoutes.includes(currentRoute)){
            return false;
        }
        return true;
     }

     componentWillUnmount() {
        this.backHandler.remove();
     }

     handlerBack() {

     }

     goBack() {
         const {navigation} = this.props;
         const {prevRoute} = navigation.state.params||{};
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