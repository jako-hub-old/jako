import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import stylesPalette from '../../utils/stylesPalette';
import moment from 'moment';

const TYPE_GAMES = 'JUE';

const GamePost = ({item}) => (
    <View style = {styles.rootGame}>
        <View style = {styles.wrapper}>
            <View style = {styles.iconWrapper}>
                <View style = { styles.iconSafeArea }>
                    <Icon name = "futbol" size = { 45 } />
                </View>
            </View>
            <View style = {styles.textWrapper}>
                <Text>{item.texto}</Text>
            </View>
        </View>        
    </View>
);

class PostItem extends React.PureComponent {
    
    render() {
        const {
            tipo,            
            fecha,
        } = this.props.item;
        const date = moment(fecha).format("YYYY-MM-DD HH:mm")
        return (
            <View style = { styles.root }>
                <View style = { styles.storyWrapper }>
                    <View style = {styles.timelineTip} />
                    {tipo === TYPE_GAMES && (
                        <GamePost item = {this.props.item} />
                    )}
                    <View style = { styles.additionalInfo }>
                        <Text note style = {{fontSize : 12,}}>
                            {date}
                        </Text>
                    </View>
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
        borderLeftWidth : 4,
        borderLeftColor : palette.primary.color,
    },
    iconWrapper : {},
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
        justifyContent : "center",
    },
    timelineTip : {
        position : "absolute",
        left : '0%',
        top : "36%",
        backgroundColor : palette.primary.color,
        width : 20,
        height : 20,
        borderRadius : 100,
        transform : [
            {translateX : -10}
        ]
    },
    additionalInfo : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "flex-end"
    },
});

PostItem.propTypes = {
    item : PropTypes.any,
};

export default PostItem;