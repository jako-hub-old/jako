import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    DrawerItems,
} from 'react-navigation';

class MainDrawer extends Component {

    render() {
        const {items, ...restProps} = this.props;
        return (
            <ScrollView>
                <DrawerItems items={items} {...restProps}/>
            </ScrollView>
        );
    }
}

export default MainDrawer;