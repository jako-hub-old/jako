import React        from 'react';
import PropTypes    from 'prop-types'
import endpoints    from '../../configs/endpoints';
import Header       from './Header';
import GameResume   from './GamesResume';
import { withApi        } from '../../providers';
import { LoadingSpinner } from '../../commons/loaders';
import { consoleError   } from '../../utils/functions';
import { 
    View, 
    Text, 
    StyleSheet,
} from 'react-native';

const ErrorMessage = ({message}) => (
    <View style = { styles.error }>
        <Text style = { {textAlign : "center"} }>{message}</Text>
    </View>
);

class UserProfileCard extends React.Component {
    state = {
        loading : true,
        error   : null,
        userInfo: {
            codigo_jugador  : null,
            nombre_corto    : null,
            seudonimo       : null,
            correo          : null,
            juegos          : null,
            asistencia      : null,
            inasistencia    : null,
        },
    };

    componentDidMount() {
        this.props.doPost(endpoints.jugador.detalle, {
            jugador : this.props.playerCode,
        })
        .then(response => {
            let userInfo = {};
            let error = null;
            const { error:errorApi, error_controlado } = response;
            if(errorApi || error_controlado) {
                error = "Ocurrió un error al obtener la información del usuario";
            } else {
                userInfo = response[0];
            }
            this.setState({
                userInfo,
                loading : false,
                error,
            });
        })
        .catch(response => {
            consoleError("Getting user info: ", response);
            this.setState({
                loading : false,
                error   : "Ocurrió un error al obtener la información del usuario",
            });
        });
    }

    renderCard() {
        const { 
            nombre_corto,
            seudonimo,
         } = this.state.userInfo;
        return (
            <>
                <Header 
                    fullName    = { nombre_corto }
                    alias       = { seudonimo }
                />
                <GameResume />
            </>
        );
    }

    render() {
        const {
            loading,
            error,
        } = this.state;
        return (
            <View style = { styles.root }>
                {loading && (<LoadingSpinner />)}
                {error && (<ErrorMessage message={error} />)}
                {!loading && !error && (this.renderCard())}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        width : "100%",
        padding : 10,
    },
    error : {
        flex            : 1,
        justifyContent  : "center",
        paddingVertical : 15,
    },
});

UserProfileCard.propTypes = {
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    playerCode      : PropTypes.any,
    navigation      : PropTypes.any,
};

export default withApi(UserProfileCard);