import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';
import {
    Toast,
    Tab,
    Tabs,
} from 'native-base';
import ItemCard from './item-card';
import CommentsList from './CommentsList';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { consoleError } from '../../utils/functions';
import Actions from './Actions';
import stylesPalette from '../../utils/stylesPalette';
import { 
    CommentGameComponent,
} from '../';
import TeamsList from './TeamsList';

class GameDetailComponent extends React.Component {
    state = {        
        codigo_juego    : null,
        nombre          : null,
        jugadores : 0,
        jugadores_confirmados : 0,
        fecha : "",
        acceso : "",
        escenario_nombre : "",
        negocio_nombre   : "",
        jugador_seudonimo : "",
        comentarios : [],
        detalles    : [],
        loadingComments : false,
        openComment     : true,
    };

    componentDidMount() {
        this.fetchGameInfo();
    }

    fetchGameInfo() {
        const {codigo_juego} = this.props.selectedGame;        
        this.setState({loadingComments : true});
        this.props.doPost(endpoints.juego.detalle, {
            juego : codigo_juego,
        })
        .then(response => {
            if(response.error_controlado || response.error) {
                Toast.show({text : "Ocurrió un error al obtener la información del juego"});
                this.setState({
                    loadingComments : false,
                });
            } else {
                const {detalles = [], equipos=[]} = response;
                const teamsBase = {};
                equipos.forEach(team => {
                    teamsBase[team.nombre] = [];
                });
                /*
                 * We preproccess the response to build a grouped details by team.
                 */
                const newDetails = detalles.reduce((buildingGroup, currentDetail) => {                    
                    const team = equipos.find(item => item.codigo_juego_equipo === currentDetail.codigo_equipo);
                    const key = team.nombre;
                    buildingGroup[key] = buildingGroup[key] || [];
                    buildingGroup[key].push(currentDetail);
                    return buildingGroup;
                }, teamsBase);
                                
                response.detalles = newDetails;
                console.log("Detailes: ", newDetails);
                this.setState({
                    ...response,
                    detalles : newDetails,
                    loadingComments : false,
                });
            }
        })
        .catch(response => {
            consoleError("List of comments", response);
            Toast.show({text : "Error al obtener comentarios"});
        });            
    }

    toggleComment() {
        this.setState({
            openComment : !this.state.openComment,
        });
    }

    onSaveComment(comment) {
        this.setState(({comentarios}) => ({
            comentarios        : [...comentarios, comment],
            openComment     : false,
        }));
    }

    onJoinToGame(selectedGame) {
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("JoinToGame", {prevRoute : currentRoute, selectedGame});
    }

    render() {
        const {selectedGame} = this.props;
        const {
            comentarios,
            loadingComments,
            openComment,
            detalles,
        } = this.state;
        console.log(comentarios);
        return (
            <View style={styles.root}>
                <ScrollView>
                    {this.state.nombre && (
                        <ItemCard 
                            game = {this.state}
                        />
                    )}
                    <Actions 
                        onComment = {() => this.toggleComment()}
                        onAdd     = {() => this.onJoinToGame(selectedGame)}
                    />
                    {openComment && (
                            <CommentGameComponent 
                                onClose       = { () => this.toggleComment() }
                                gameCode      = { selectedGame.codigo_juego }
                                onSaveComment = { this.onSaveComment.bind(this) }
                            />
                        )}
                    <View>
                        <Tabs 
                            tabContainerStyle       = { {elevation:0} }
                            tabBarUnderlineStyle    = { styles.tabUnderLine }
                        >                            
                            <Tab 
                                heading             = "Comentarios" 
                                tabStyle            = { styles.tabDefault } 
                                textStyle           = { styles.tabText }
                                activeTabStyle      = { styles.tabActive }                                
                                activeTextStyle     = { styles.tabActiveText }
                            >
                                
                                <CommentsList 
                                    comments = { comentarios }
                                    loading  = { loadingComments }
                                />
                            </Tab>
                            <Tab 
                                heading             = "Jugadores" 
                                tabStyle            = { styles.tabDefault } 
                                textStyle           = { styles.tabText }
                                activeTabStyle      = { styles.tabActive }                                
                                activeTextStyle     = { styles.tabActiveText }
                            >
                                <TeamsList 
                                    teams = { detalles }
                                />
                            </Tab>
                        </Tabs>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flex : 1,
        paddingVertical     : 10,
        justifyContent          : "center",
    },
    tabDefault : {
        backgroundColor : "#FFF",
        shadowColor : "#eee121"
    },
    tabActive : {
        backgroundColor : "#e0e0e0",
    },
    tabActiveText : {
        color : "#000",
    },
    tabText : {
        color : "#bdbdbd"
    },
    tabUnderLine : {
        backgroundColor : palette.primary.color,
    },
});

GameDetailComponent.propTypes = {
    navigation : PropTypes.any,
    selectedGame : PropTypes.shape({
        "codigo_juego"          : PropTypes.any,
        "nombre"                : PropTypes.string,
        "jugadores"             : PropTypes.number,
        "jugadores_confirmados" : PropTypes.number,
        "fecha"                 : PropTypes.string,
        "acceso"                : PropTypes.string,
        "escenario_nombre"      : PropTypes.string,
        "negocio_nombre"        : PropTypes.string,
        "jugador_seudonimo"     : PropTypes.string,
    }),
    doPost          : PropTypes.func,
};

export default withApi(GameDetailComponent);