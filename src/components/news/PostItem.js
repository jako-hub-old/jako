import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';
import moment from 'moment';
import defaultGameImage from '../../assets/images/game-default-image.png';
import {DEFAULT_USER_IMG, IMAGES_SERVER} from 'react-native-dotenv';
const TYPE_GAMES = 'JUE';

const GamePost = ({item, date}) => (
    <View style = {styles.rootGame}>
        <View style = {styles.wrapper}>
            <View style = {styles.iconWrapper}>
                <View style = { styles.iconSafeArea }>
                    <Image style = { styles.image }  source = { defaultGameImage } />
                </View>
            </View>
            <View style = {styles.textWrapper}>
                <Text style = { styles.postText }>{item.texto}</Text>
                <Text note style = {{fontSize : 12, marginTop : 10}}>
                    {date}
                </Text>
            </View>
        </View>        
    </View>
);

class PostItem extends React.PureComponent {
    
    render() {
        const {
            tipo,            
            fecha,
            foto,
        } = this.props.item;
        const date = moment(fecha).format("YYYY-MM-DD HH:mm")
        return (
            <View style = { styles.root }>
                <View style = { styles.storyWrapper }>
                    <View style = {styles.timelineTip}>
                        <Image 
                            source = { { uri : foto? `${IMAGES_SERVER}${foto}` : DEFAULT_USER_IMG } } 
                            style = { styles.userImage }
                        />
                    </View>
                    {tipo === TYPE_GAMES && (
                        <GamePost item = {this.props.item} date = { date } />
                    )}
                </View>
            </View>
        );
    }
}

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flex : 1,
        paddingHorizontal : 20,
    },
    storyWrapper : {
        borderLeftWidth : 1,
        borderLeftColor : palette.accent.divider,
        borderBottomWidth : 1,
        borderBottomColor : palette.accent.divider,
        borderBottomLeftRadius : 8,
        marginTop : -5,
    },
    iconWrapper : {
        borderRadius : 50,        
    },
    rootGame : {
        flex : 1,
        paddingLeft : 15,
    },
    wrapper : {
        flex : 1,
        flexDirection : "row",
        padding : 15,
        paddingLeft : 15,
    },
    iconSafeArea : {

    },
    iconWrapper : {
        flex : 2,
        justifyContent : "center",
    },
    textWrapper : {
        flex : 10,
        justifyContent : "flex-start",
        paddingLeft : 20,
    },
    timelineTip : {
        position : "absolute",
        left : '0%',
        top : "15%",
        backgroundColor : "#f0f0f0",
        borderColor : palette.accent.divider,
        borderWidth : 1,
        justifyContent : "center",
        alignItems : "center",
        width : 30,
        height : 30,
        borderRadius : 100,
        transform : [
            {translateX : -15}
        ]
    },
    additionalInfo : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "flex-end",

    },
    image : {
        width : 50,
        height : 50,
        borderRadius : 50,
    },
    postText : {
        fontSize : 12,
    },
    userImage : {
        width : 30,
        height : 30,
        borderRadius : 100,
    },
});

PostItem.propTypes = {
    item : PropTypes.any,
};

export default PostItem;