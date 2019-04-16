export default {
    usuarios : {
        lista      : '/v1/usuario/lista',
        validar    : '/v1/usuario/validar',
        verificar  : '/v1/usuario/verificar',
        informacion: '/v1/usuario/informacion',
        guardarPseudonimo : '/v1/jugador/informacion/complementaria',
        guardarTokenFCM : '/v1/usuario/guardar/fcm-token',
    },
    juego : {
        nuevo   : '/v1/juego/nuevo',
        buscar  : '/v1/juego/buscar',
        detalle : '/v1/juego/detalle',
        unir    : '/v1/juego/unir',
        jugador : '/v1/juego/jugador',
        retirar : '/v1/juego/retirar',
        invitar : '/v1/juego/invitar',
        cerrar : '/v1/juego/cerrar',
        compartirConAmigos : '/v1/juego/compartir/amigos',
    },
    escenarios : {
        lista : '/v1/escenario/lista',        
    },
    jugador : {
        buscar : '/v1/jugador/buscar',
        amigos : '/v1/jugador/amigos',
        detalle : '/v1/jugador/detalle',
        guardarFoto : '/v1/jugador/guardar/foto',
    },
    jugador_solicitud : {
        pendiente   : '/v1/jugador/solicitud/pendiente',
        nuevo       : '/v1/jugador/solicitud/nuevo',
        respuesta   : '/v1/jugador/solicitud/respuesta',
    },
    comentario : {
        nuevo : '/v1/comentario/nuevo',
        lista : '/v1/comentario/lista',
    },
    posicion : {
        lista : '/v1/posicion/lista',
    },
};