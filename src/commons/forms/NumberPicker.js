import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Button = ({icon, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
            <Icon name={icon} size={20} />
        </View>
    </TouchableOpacity>
);

/**
 * This form control allows to pick a number
 * @param {*} param0 
 */
const NumberPicker = ({onChange, value=0, defaultValue, label="Pick a number", step=1, max=false, min=false}) => {
    const [numVal, setVal] = useState(defaultValue? defaultValue : value);

    const addValue = () => {
        let newValue = numVal + step;
        if(max !== false && newValue > max) newValue = max;
        setVal(newValue);
        if(onChange) onChange(newValue);
    };

    const substractValue = () => {
        let newValue = numVal - step;
        if(min !== false && newValue < min) newValue = min;
        setVal(newValue);
        if(onChange) onChange(newValue);
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>{label}</Text>
            <View style={styles.wrapper}>
                <Button icon="minus" onPress={substractValue} />
                <Text style={styles.text}>{numVal}</Text>
                <Button icon="plus"  onPress={addValue}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "flex-end",
        paddingHorizontal   : 20,
    },
    title : {
        textAlign : "center",
        marginBottom : 10,
    },
    wrapper : {
        flex                : 1,
        flexDirection       : "row",
        alignItems          : "center",
        justifyContent      : "space-between",        
    },
    text : {
        fontSize : 20,
    },
    button : {
        borderWidth     : 1,
        borderColor     : "#bdbdbd",
        alignItems      : "center",
        justifyContent  : "center",
        borderRadius    : 50,
        height          : 40,
        width           : 40,
    },
});

NumberPicker.propTypes = {
    onChange    : PropTypes.func,
    default     : PropTypes.number,
    min         : PropTypes.number,
    max         : PropTypes.number,
    label       : PropTypes.string,
    step        : PropTypes.number,
};

export default NumberPicker;