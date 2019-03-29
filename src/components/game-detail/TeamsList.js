import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    List,
    ListItem,
    Body,
    Badge,
    Left,
    Right,
    Text,
    Thumbnail,
} from 'native-base';
import {DEFAULT_USER_IMG} from 'react-native-dotenv';

const RenderTeam = ({teamName, team=[]}) => (
    <>
        <ListItem itemDivider>
            <Text>{teamName}</Text>
        </ListItem>
        {team.length === 0 && (
            <ListItem>
                <Text note style={{textAlign : "center"}}>Sin jugadores aún</Text>
            </ListItem>
        )}
        {team.map((player, key) => {
            const playerNumber = parseInt(player.numero);
            return (
                <ListItem 
                    key={`player-item-list-${player.codigo_jugador}-$key`}
                    noIndent
                    avatar
                >
                    <Left>
                        <Thumbnail source={{uri : DEFAULT_USER_IMG}} />
                    </Left>
                    <Body>
                        <Text>{player.jugador_nombre_corto}</Text>
                        <View style={{flex: 1, flexDirection : "row"}}>
                            <Text note>Pos:</Text><Badge primary><Text>{player.posicion_nombre}</Text></Badge>
                        </View>                        
                    </Body>
                    <Right>
                        <Text note>{`#${playerNumber < 9? '0' : ''}${player.numero}`}</Text>
                    </Right>
                </ListItem>
            );
        })}
    </>
);

const TeamsList = ({teams={}}) => {
    const teamNames = Object.keys(teams);
    console.log("names", teamNames);
    return (
        <View style={styles.root}>
            <List>
                {teamNames.map((teamName, key) => (
                    <RenderTeam 
                        key     = { `team-list-item-${teamName}-${key}` } 
                        team    = { teams[teamName] }
                        teamName= { teamName }
                    />
                ))}
                
            </List>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {

    },
});

TeamsList.propTypes = {
    teams : PropTypes.any,
};

export default TeamsList;