import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    RefreshControl,
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
} from 'native-base';
import { Button } from '../../commons/forms';
import Item from './item';
import { withSession } from '../../providers';

const EmptySet = ({goToCreate, crearJuego}) => (
    <View style={styles.EmptySet}>
        <View>
            <Text style={{textAlign : "center"}} note>Al parecer no hay juegos cercanos</Text>
            {crearJuego && (
                <View style={{flex : 1, alignItems : "center", marginTop: 15}}>
                    <Button info onPress={goToCreate}>
                        Crea un juego e invita tus amigos
                    </Button>
                </View>
            )}
        </View>
    </View>
);

const Results = ({sessionStack:{crearJuego}, results=[], onSelectItem, onJoinToGame, loading=false, onRefresh, goToCreate, }) => (
    <ScrollView 
        style           = { {marginTop : 15, flex : 1, flexDirection: "column"} }
        refreshControl  = {(
            <RefreshControl 
                refreshing = { loading   }
                onRefresh  = { onRefresh }
            />
        )}
    >   
        {results.length === 0 && (
            <EmptySet goToCreate={ goToCreate } crearJuego={crearJuego} />
        )}
        {results.map((item, key) => (
            <Item 
                key         = { `${item.code}-${key}` } 
                onSelect    = { () => onSelectItem(item) }
                item        = { item }
                onAdd       = { () => onJoinToGame? onJoinToGame(item) : null }
            />
        ))}
    </ScrollView>
);

const styles = StyleSheet.create({
    EmptySet : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "center",
        paddingVertical : 30,
    },
});

Results.propTypes = {
    results      : PropTypes.array.isRequired,
    loading      : PropTypes.bool,
    onSelectItem : PropTypes.func,
    onJoinToGame : PropTypes.func,
    onRefresh    : PropTypes.func,
    goToCreate   : PropTypes.func,
};

export default withSession(Results);