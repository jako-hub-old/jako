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
import { CancelFriendshipButton, FriendshipButton, ConfirmFriendshipButton, } from '../../commons/buttons';
import { FriendshipRequests } from '..';
import Icon from 'react-native-vector-icons/FontAwesome5';

const palette = stylesPalette();

/**
 * This component only renders the profile view.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const Header = ({photo, onViewProfile, requestSended, fullName, me, alias, isFriend, isPlayer, playerCode, disableUpload, onSelectImage, userFriends}) => (
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
            {isPlayer && isFriend && (
                <View styles = { styles.firendshipButton }>
                    <Text style = { {textAlign : "center"} }>Amigos <Icon name="thumbs-up" size = { 20 } /></Text>
                </View>
            )}
            {!requestSended  && isPlayer && !isFriend && !me && (
                <View styles = { styles.firendshipButton }>
                    <FriendshipButton playerCode = { playerCode } />
                </View>
            )}
            {me && (
                <View styles = { styles.firendshipButton }>
                    <FriendshipRequests onViewProfile = { onViewProfile } />
                </View>
            )}
            {!me && requestSended && (
                <View style = { styles.firendshipButtonHorizontal }>
                    <Text note>Este usuario quiere ser tu amigo</Text>
                    <View style = { styles.horizontalButton }>
                        <ConfirmFriendshipButton playerCode = { playerCode } />
                        <CancelFriendshipButton playerCode = { playerCode } />
                    </View>
                </View>
            )}
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
    firendshipButton : {
        flexDirection   : "row", 
        justifyContent : "center", 
        alignItems : "center",
    },
    horizontalButton : {
        flex : 1,
        flexDirection : "row",
    },
    firendshipButtonHorizontal : { 
        flex : 1,
        alignItems : "center",
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
    isPlayer        : PropTypes.bool,
    isFriend        : PropTypes.bool,
    playerCode      : PropTypes.any,
    onViewProfile   : PropTypes.func,
    requestSended   : PropTypes.bool,
};

export default Header;