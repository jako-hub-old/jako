import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import TeamForm from './TeamForm';

const TeamManager = ({onAddTeam, teams=[]}) => {
    return (
        <View style={styles.root}>
            <TeamForm 
                onSubmit = {onAddTeam}
            />
        </View>
    );
};

TeamManager.propTypes = {
    onAddTeam   : PropTypes.func,
    teams       : PropTypes.array,
};

const styles = StyleSheet.create({
    root : {

    },
});

export default TeamManager;