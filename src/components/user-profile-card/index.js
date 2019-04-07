import React        from 'react';
import PropTypes    from 'prop-types'
import endpoints    from '../../configs/endpoints';
import Header       from './Header';
import GameResume   from './GamesResume';
import FriendsList  from './FriendsList';
import { withApi, withUserData        } from '../../providers';
import { LoadingSpinner } from '../../commons/loaders';
import { consoleError   } from '../../utils/functions';
import { 
    View, 
    Text, 
    StyleSheet,
} from 'react-native';
import { CommonTabs } from '../../commons/others';

const ErrorMessage = ({message}) => (
    <View style = { styles.error }>
        <Text style = { {textAlign : "center"} }>{message}</Text>
    </View>
);

/**
 * This component displays any user personal information.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 *
 * @class UserProfileCard
 * @extends {React.Component}
 */
class UserProfileCard extends React.Component {
    tabOptions = [

    ];

    state = {
        loading         : true,
        loadingFriends  : true,
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
        friends : [],
    };

    constructor(props) {
        super(props);
        tabOptions = [
            {label : "Información", component : this.renderUserInfo() },
            {label : "Amigos",      component : null },
        ];
    }

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
                console.log(response);
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

    fetchMyFriends() {
        this.setState({loadingFriends : true});
        const {playerCode, fromOtherUser} = this.props;
        this.props.fetchMyFriends(playerCode, fromOtherUser)
            .then( response => {
                this.setState({loadingFriends : false, friends : response});
            })
            .catch(() => {
                this.setState({loadingFriends : false});
            });
    }

    onViewProfile({codigo_jugador_amigo:playerCode, seudonimo:playerAlias}) {
        this.props.navigation.navigate("PlayerProfile", {playerCode, playerAlias});
    }

    renderUserInfo() {
        const {optionsComponent} = this.props;
        const {
            asistencia,
            inasistencia,
        } = this.state.userInfo;
        return (
            <>
                <GameResume 
                    assists     = { asistencia   }
                    absences    = { inasistencia }
                />
                { optionsComponent }
            </>
        );
    }

    renderCard() {
         const {
             userInfo : { 
                nombre_corto,
                seudonimo,
                foto,
             },
             loadingFriends,
             friends=[],             
         } = this.state;
        const { 
            disableUpload, 
            openImagePicker,
            userPhoto,
            me,
        } = this.props;        
        const userInfo = this.renderUserInfo();
        console.log("foto: ", foto);
        return (
            <>
                <Header 
                    photo           = { me? userPhoto :  foto }
                    fullName        = { nombre_corto    }
                    alias           = { seudonimo       }
                    disableUpload   = { disableUpload   }
                    onSelectImage   = { openImagePicker }
                />
                <CommonTabs 
                    id      = "user-tabs"
                    tabs    = { [
                        {
                            label : `Amigos (${friends.length})`, 
                            component : (
                                <FriendsList 
                                    fetchFriends    = { () => { this.fetchMyFriends() } } 
                                    friends         = { friends }
                                    loading         = { loadingFriends }
                                    onViewProfile   = { this.onViewProfile.bind(this)   }
                                />
                            )
                        },
                        {label : "Información", component : userInfo},                        
                    ] }
                />
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
        flex : 1,
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
    navigation      : PropTypes.any.isRequired,
    disableUpload   : PropTypes.bool,
    optionsComponent: PropTypes.any,
    fetchMyFriends  : PropTypes.func,
    friends         : PropTypes.array,
    fromOtherUser   : PropTypes.bool,
    openImagePicker : PropTypes.func,
    userPhoto       : PropTypes.string,
    me              : PropTypes.bool,
};

export default withApi(withUserData(UserProfileCard));