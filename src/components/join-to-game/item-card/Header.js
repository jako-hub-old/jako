import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
/**
 * This component only renders the item header
 * @param {*} param0 
 */
const Header = ({title="", totalPlayers=0, confirmedPlayers=0, date="00-00-00 00:00", dateTo="00-00-00 00:00"}) => {
    const gameDate = moment(date);
    const gameDateTo = moment(dateTo);
    const formattedDate = gameDate.format("YYYY-MM-DD");
    const timeFrom = gameDate.format("HH:mm");
    const timeTo = gameDateTo.format("HH:mm");
    const time = `(${timeFrom} - ${timeTo})`;
    return (
        <View style={styles.root}>
            <View style={styles.row}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.playersInfo}>
                    <Text>{`${confirmedPlayers}/${totalPlayers}`}</Text>
                </View>
            </View>
            <View style={styles.date}>
                <Text note style={styles.textDate}>{`${formattedDate} ${time}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
    row : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "space-between",
        alignItems      : "center",
    },
    title : {
        fontSize : 18,
        fontWeight: "normal",
        color : "#000",
    },
    titleWrapper : {
        flex : 9,
    },
    playersInfo : {
        flex : 2,
    },
    textDate : {
        fontSize : 12,
    },
});

Header.propTypes = {
    title               : PropTypes.string.isRequired,
    totalPlayers        : PropTypes.number,
    confirmedPlayers    : PropTypes.number,
    date                : PropTypes.string,
    dateTo              : PropTypes.string,
};

export default Header;