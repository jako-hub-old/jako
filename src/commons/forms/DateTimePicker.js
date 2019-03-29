import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RoundedButton from './RoundedButton';
import DatePicker from 'react-native-modal-datetime-picker';

const DateTimePicker = ({value, onChange}) => {
    const [opened, toggleOpen] = useState(false);
    return (
      <>
        <View style={styles.root}>
            <TouchableOpacity onPress={() => toggleOpen(!opened)}>
                <View style={styles.wrapper}>
                    <View style={styles.textWrapper}>
                        <Text>{!value? "Seleccione una fecha" : value}</Text>
                    </View>
                    <View>
                        <RoundedButton primary onPress={() => toggleOpen(!opened)}>
                            <Icon name="calendar-alt" size={20}/>
                        </RoundedButton>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <DatePicker
            isVisible   = { opened      }
            onConfirm   = { newDate => { onChange(newDate); toggleOpen(false) }}
            onCancel    = { () => { toggleOpen(false) }}
            mode        = { "datetime"  }
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
        alignItems : "flex-end",
    },
    textWrapper : {
        flex : 7,
    },
    buttonWrapper : {
        flex : 1,
    },
});

DateTimePicker.propTypes = {
    onChange : PropTypes.func,
};

export default DateTimePicker;