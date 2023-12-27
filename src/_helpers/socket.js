import SockJS from "sockjs-client/dist/sockjs"
import Stomp from "stompjs";
import { config } from "../_config";
import { appStorage, handleSocketMessage } from "../_helpers";

let stompClient;
let reconnectTimeout;

function connectSocket({
    dispatch
}) {
    const socket = new SockJS(config.SOCKET_URL + "/taller");
    stompClient = Stomp.over(socket);

    stompClient.heartbeat.outgoing = 10000; // Latidos salientes cada 10 segundos
    stompClient.heartbeat.incoming = 10000; // Espera latidos entrantes cada 10 segundos

    stompClient.connect({}, () => {
        subscribeSocket({
            dispatch
        });
    }, (error) => {
        console.info("Error Socket Connection: ", error);

        // Intentar reconexión después de un período de tiempo
        scheduleReconnect({ dispatch });
    },);

    stompClient.debug = () => { };
}
function scheduleReconnect({ dispatch }) {
    if (!reconnectTimeout) {
        reconnectTimeout = setTimeout(() => {
            connectSocket({ dispatch });
            reconnectTimeout = null;
        }, 5000); // Re-intentar la conexión después de 5 segundos (ajusta el tiempo según tus necesidades)
    }
}

function subscribeSocket({
    dispatch,
}) {
    const userLocal = appStorage.getUser();
    const perfilUserLocal = userLocal.ccPerfil;

    if (userLocal != undefined && userLocal != "") {

        // los canales se configuran basado en necesidades de cada proyecto
        if (perfilUserLocal.clave === "02") {
            stompClient.subscribe("/sesiones/cliente", (responseSocket) => {
                let socketBody = JSON.parse(responseSocket.body);

                handleSocketMessage({ socketBody, dispatch });
            });
        }
        if (perfilUserLocal.clave === "03") {
            stompClient.subscribe("/sesiones/agente", (responseSocket) => {
                let socketBody = JSON.parse(responseSocket.body);

                handleSocketMessage({ socketBody, dispatch });
            });
        }
    }
}
function sendMessageSocket({
    destino,
    messageBuild,
}) {
    const socketDestino = config.SOCKET_URL + destino;

    fetch(socketDestino, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageBuild)
    })
        .then(response => response)
        .catch((error) => {
            console.error("Error Socket Send: ", error);
        });
}
function disconnectSocket() {
    if (stompClient) {
        stompClient.disconnect();
    }
}

export {
    connectSocket,
    subscribeSocket,
    sendMessageSocket,
    disconnectSocket,
}