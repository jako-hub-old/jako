import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Form,
    Textarea,
    Toast,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RoundedButton } from '../commons';
import { withSession, withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { consoleError } from '../../utils/functions';


class CommentGame extends React.Component {
    state = {
        comment : "",
    };
    
    onChange(comment) {
        this.setState({
            comment,
        });
    }

    onSaveComment() {
        const {
            gameCode,
            sessionStack:{userCode},
        } = this.props;
        const comment = this.state.comment;
        this.props.startLoading();
        this.props.doPost(endpoints.comentario.nuevo, {
            juego       : gameCode,
            jugador     : userCode,
            comentario  : comment,
        })
        .then(response => {
            const {guardado, fecha, codigo_comentario, jugador, codigo_jugador, foto_usuario} = response;
            if(guardado) {
                this.props.onSaveComment({
                    comentario: comment,
                    fecha,
                    codigo_comentario,
                    jugador,
                    codigo_jugador,
                    foto_usuario,
                });
            } else {
                consoleError("Guardar comentario", response);
                Toast.show({text : 'Ocurrió un error al guardar el comentario'});
            }
            this.props.stopLoading();
        })
        .catch(response => {
            console.log("error: ", response);
            this.props.stopLoading();
        });
    }

    render() {
        const {
            comment,
        } = this.state;
        return (
            <Form style={styles.root}>
                <View style={styles.mainWrapper}>
                    <View style={styles.textWrapper}>
                        <Textarea 
                            rowSpan={3} 
                            placeholder={"Escribe tu opinión..."} 
                            value={comment}
                            onChangeText={text => this.onChange(text)}
                        />
                    </View>                    
                    <View style={styles.buttonWrapper}>
                        <RoundedButton primary disabled={comment === ""} onPress={() => this.onSaveComment()}>
                            <Icon name="send" size={20} />
                        </RoundedButton>
                    </View>
                </View>
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        marginVertical : 25,
        paddingHorizontal : 10,
    },
    mainWrapper : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : "center",
        borderBottomColor : "#e0e0e0",
        borderBottomWidth : 2,
    },
    textWrapper : {
        flex : 8,                
    },
    buttonWrapper : {
        flex : 2,
        flexDirection : 'row',
        justifyContent : "flex-end",
        alignItems : "center",
    },
});

CommentGame.propTypes = {
    onClose      : PropTypes.func,
    sessionStack : PropTypes.object,
    gameCode     : PropTypes.any,    
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    onSaveComment   : PropTypes.func,
};

export default withSession(withApi(CommentGame));