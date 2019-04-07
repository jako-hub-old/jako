import React            from 'react';
import PropTypes        from 'prop-types';
import stylesPalette    from '../../utils/stylesPalette';
import {
    View,
    Text,
    Thumbnail,
} from 'native-base';
import { StyleSheet       }       from 'react-native';
import { DEFAULT_USER_IMG }   from 'react-native-dotenv';
import { IconButton       }      from '../../commons/forms';

const palette = stylesPalette();

/**
 * This component only renders the profile view.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const Header = ({photo, fullName, alias, disableUpload, onSelectImage}) => (
    <View style = { styles.root }>
        <View style = { styles.contentWrapper}>
            <View style = {styles.picWrapper}>
                <View style = { styles.thumbWrapper }>
                    <Thumbnail style = { {width : "100%", height : "100%", borderRadius : 50} } source={{uri : photo || DEFAULT_USER_IMG}} />
                    {!disableUpload && (
                        <View style={styles.buttonTip}>
                            <IconButton 
                                onPress = { onSelectImage } 
                                icon    = "camera" 
                                color   = { "#FFF" } 
                                small 
                            />
                        </View>
                    )}
                </View>
            </View>
            <View style = { styles.userInfo }>
                <Text>{fullName}</Text>
                {alias && (<Text style = { styles.alias }>({alias})</Text>)}
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        flexDirection       : "row",        
        borderBottomWidth   : 1,
        borderBottomColor   : "#f2f2f2",
        paddingBottom       : 15,
    },
    contentWrapper : {
        flex            : 1,
        flexDirection   : "column",
        justifyContent  : "center",
    },
    picWrapper : {
        flexDirection : "row",
        justifyContent  : "center",
    },
    thumbWrapper : {
        height : 80,
        width : 80,
        margin : 15,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#f2f2f2",
        borderRadius    : 50,
    },    
    buttonTip : {
        position : "absolute",
        left     : "60%",
        top      : "60%",
        backgroundColor : palette.primary.color,
        borderRadius : 50,
    },
    userInfo : {
        flexDirection   : "row",
        justifyContent  : "center",
        marginTop       : 10,
    },
    alias : {
        marginLeft  : 10,
        color       : "#bdbdbd",
    },
});

Header.propTypes = {
    photo           : PropTypes.string,
    fullName        : PropTypes.string,
    alias           : PropTypes.string,
    disableUpload   : PropTypes.bool,
    onSelectImage   : PropTypes.func,
    photo           : PropTypes.string,
};

export default Header;