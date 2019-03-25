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

class GameDetailComponent extends React.Component {
    state = {
        comments        : [],
        loadingComments : false,
        openComment     : true,
    };

    componentDidMount() {
        this.fetchComments();
    }

    fetchComments() {
        const {codigo_juego} = this.props.selectedGame;
        this.setState({loadingComments : true});
        this.props.doPost(endpoints.comentario.lista, {
            juego : codigo_juego,
        })
        .then(response => {        
            let comments = [];
            if(response.error_controlado) {

            } else if(response.error){

            } else {
                comments = response;
            }
            this.setState({
                comments,
                loadingComments : false,
            });
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
        this.setState(({comments}) => ({
            comments        : [...comments, comment],
            openComment     : false,
        }));
    }

    render() {
        const {selectedGame} = this.props;
        const {
            comments,
            loadingComments,
            openComment,
        } = this.state;
        return (
            <View style={styles.root}>
                <ScrollView>
                    <ItemCard 
                        game = {selectedGame}
                    />
                    <Actions 
                        onComment = {() => this.toggleComment()}
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
                                    comments = { comments }
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
                                <Text>Jugadores!</Text>
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