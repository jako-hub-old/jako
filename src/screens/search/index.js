import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { SearchComponent, SearchFilter, SearchFriends } from '../../components';
import { FabButton } from '../../commons/buttons';
import { withSession } from '../../providers';
import {
    Tabs,
    Tab,
} from 'native-base';
import { CommonTabs } from '../../commons/others';

export {default as GameDetailScreen} from './GameDetail';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyProfileScreen extends React.Component {
    state = {
        currentTab : 0,
    };

    constructor(props) {
        super(props);
        const {state} = props.navigation;
        if(state.params && state.params.goToFriends) {
            this.state.currentTab = 1;
            alert("here!");
        }
    }

    componentDidMount() {
        
    }

    onChangeTab({i}) {
        this.setState({currentTab:i});
    }

    render() {
        const navigation = this.props.navigation;
        const {crearJuego} = this.props.sessionStack;
        const {
            currentTab,
        } = this.state;
        return (
            <BaseScreen 
                navigation      = {navigation} 
                title           = {false} 
                TitleComponent  = {(<SearchFilter />)}
                disableNotify
                enableFriendSuggester
            >
                <CommonTabs 
                    id = "id-search-tabs"
                    onChangeTab = {this.onChangeTab.bind(this)}
                    tab = {currentTab}
                    tabs = {[
                        {
                            label : "Juegos",
                            component : (currentTab === 0 && ( <View style={styles.root}><SearchComponent navigation={navigation} /></View>)),
                        },
                        {
                            label : "Amigos",
                            component : (currentTab === 1 && (<SearchFriends navigation = {navigation} />)),
                        },
                    ]}
                />
                
                
                <FabButton 
                    icon = "plus"
                    onPress = {() => navigation.navigate("CreateGame", {prevRoute : "Search"})}
                />
                
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "flex-start",
        flexDirection : "column",
        paddingHorizontal   : 10,
        paddingVertical     : 10,
    },
});

MyProfileScreen.propTypes = {
    navigation : PropTypes.object,
    sessionStack : PropTypes.object,
};

export default withSession(MyProfileScreen);