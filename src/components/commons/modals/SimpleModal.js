import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    Button
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

const SimpleModal = ({open, onClose, animation="fade", children, title}) => (
    <Modal
        visible         = {open}
        onRequestClose  = {onClose}
        animationType   = {animation}
        transparent
    >
        <View style={styles.backDrop}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {title}
                    </Text>                                        
                </View>                
                <ScrollView>
                    {children}
                </ScrollView>                    
                <View style={{justifyContent : "center", alignItems : "center"}}>
                    <TouchableOpacity onPress={onClose}>
                        <View style={styles.button}>
                            <Icon name="times" size={25}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    backDrop : {
        backgroundColor     : "rgba(0,0,0,0.3)",
        flex                : 1,
        alignItems          : "center",
        justifyContent      : "center",
    },
    content : {
        backgroundColor : "#FFF",
        padding : 20,
        marginHorizontal : 5,
        width : "90%",
        maxHeight : "90%",
    },
    headerText : {
        textAlign : "center",
    },      
    button : {
        width : 60,
        height : 60,
        justifyContent : "center",
        alignItems : "center",
    },
    buttonWrapper : {
        flex : 1,
        padding : 10,
        marginBottom : 30,
        flexDirection : "row",
        justifyContent : "center", 
        alignItems : "center",
        backgroundColor : "#FFF",
    },
});

SimpleModal.propTypes = {
    open    : PropTypes.bool,
    onClose : PropTypes.func,
    animation : PropTypes.string,
};

export default SimpleModal;