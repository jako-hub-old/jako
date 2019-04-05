import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, } from 'native-base';
import { CustomChip } from '../../commons/others';
const GamesResume = () => (
    <View>
        <CustomChip icon={"thumbs-up"} label = { 0 }    />
        <CustomChip icon={"thumbs-down"} label = { 0 }  type="danger" />
    </View>
);

export default GamesResume;