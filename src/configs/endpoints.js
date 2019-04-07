export default {
    usuarios : {
        lista      : '/v1/usuario/lista',
        validar    : '/v1/usuario/validar',
        verificar  : '/v1/usuario/verificar',
        informacion: '/v1/usuario/informacion',
        guardarPseudonimo : '/v1/jugador/informacion/complementaria',
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
    jugaor_solicitud : {
        pendiente   : '/v1/jugador/solicitud/pendiente',
        nuevo       : '/v1/jugador/solicitud/',
        respuesta   : '/v1/jugador/solicitud/',
    },
    comentario : {
        nuevo : '/v1/comentario/nuevo',
        lista : '/v1/comentario/lista',
    },
    posicion : {
        lista : '/v1/posicion/lista',
    },
};