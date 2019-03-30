import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-modal-datetime-picker';
import IconButton from './IconButton';

const resolveIcon = (mode) => {
    switch(mode) {
        case 'time': return 'clock';
        default: return "calendar-alt";
    }
};

const TimeSelector = ({value, onChange, label="Select a date", mode="datetime"}) => {
    const [opened, toggleOpen] = useState(false);
    return (
      <>
        <View style={styles.root}>
            <TouchableOpacity onPress={() => toggleOpen(!opened)}>
                <View style={styles.wrapper}>
                    <View style={styles.textWrapper}>
                        <Text>{!value? label : value}</Text>
                    </View>
                    <View style={{justifyContent : "center"}}>
                        <IconButton 
                            icon = {resolveIcon(mode)}
                            onPress={() => toggleOpen(!opened)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <DatePicker
            isVisible   = { opened      }
            onConfirm   = { newDate => { onChange(newDate); toggleOpen(false) }}
            onCancel    = { () => { toggleOpen(false) }}
            mode        = { mode }
        />
      </>
    );
};


const styles = StyleSheet.create({
    root : {
        paddingVertical : 5,
        marginTop       : 15,
        paddingLeft     : 15,  
    },
    wrapper : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        borderColor : "#bdbdbd",
        borderBottomWidth : 1,
    },
    textWrapper : {
        flex : 7,
    },
    buttonWrapper : {
        flex : 1,
    },
});

TimeSelector.propTypes = {
    onChange : PropTypes.func,
};

export default TimeSelector;