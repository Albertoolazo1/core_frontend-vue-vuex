import { config } from "../_config"
import { appStorage } from "./appStorage";
/**
 * Procesa una respuesta del servidor y devuelve un objeto con información sobre el resultado.
 *
 * @param {object} response - Respuesta del servidor.
 * @param {number} response.code - Código numérico que indica el resultado de la operación.
 * @param {object} response.body - Cuerpo de la respuesta.
 * @returns {object} Objeto con información sobre el resultado.
 * @property {object} message - Objeto con información sobre el mensaje de respuesta.
 * @property {string} message.text - Texto del mensaje de respuesta.
 * @property {string} message.type - Tipo del mensaje de respuesta ("success" o "error").
 * @property {string} message.timer - Tiempo que el mensaje de respuesta debería mostrarse antes de desaparecer.
 * @property {object} body - Cuerpo de la respuesta.
 * @property {number} code - Código numérico que indica el resultado de la operación (si está disponible).
 */
function handleResponseConvert(response) {
    const messageMap = {
        1: "Se guardó correctamente.",
        2: "Se actualizó correctamente.",
        3: "Se eliminó correctamente.",
        4: "Se listó correctamente.",
        5: "El archivo es válido.",
        6: "El archivo se descargó correctamente.",
        7: "El cálculo es correcto.",
        8: "El mail se envió correctamente.",
        9: "Se autorizó el expediente digital correctamente.",
        10: "El código es válido.",
        11: "Cancelación exitosa.",
    };

    const defaultMessage = "Ocurrió un error.";

    const message = {
        text: messageMap[response.code] || defaultMessage,
        type: messageMap[response.code] ? "success" : "error",
        timer: "10000",
    };

    return {
        message,
        body: response.body,
        code: response.code || 0,
    };
}

/**
 * Obtiene la fecha y hora actual en formato YYYY-MM-DD HH:mm:ss o DD/MM/YYYY HH:mm:ss según el parámetro type.
 * @param {boolean} [devolverHora=true] - Indica si se debe incluir la hora en la fecha y hora retornada.
 * @param {string} [type='a'] - Indica el formato en el que se debe retornar la fecha y hora. Si es 'a' retorna en formato YYYY-MM-DD HH:mm:ss, si es 'b' retorna en formato DD/MM/YYYY HH:mm:ss.
 * @returns {string} La fecha y hora actual en el formato especificado.
 */
function getFechaActual(devolverHora = true, type = 'a') {
    let fecha = "";

    if (type == 'a') {
        let d = new Date();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let yy = d.getFullYear();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();

        dd = dd < 10 ? "0" + dd : dd;
        mm = mm < 10 ? "0" + mm : mm;
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;


        if (!devolverHora) {
            fecha = yy + '-' + mm + '-' + dd;
        } else {
            fecha = yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
        }
    } else {
        if (!devolverHora) {
            fecha = new Date()
                .toLocaleString("es", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
        } else {
            fecha = new Date()
                .toLocaleString("es", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
        }
    }

    return fecha.replace(",", "");
}

/**
 * Descarga un archivo codificado en base64 en el navegador.
 *
 * @param {string} file - Cadena codificada en base64 que representa el archivo a descargar.
 * @param {string} fileName - Nombre del archivo a descargar.
 * @param {string} mimeType - Tipo MIME del archivo a descargar.
 * @throws {Error} Lanza un error si los parámetros file, fileName o mimeType están ausentes.
 */
function descargarArchivoFromB64(file, fileName, mimeType) {
    if (!file || !fileName || !mimeType) {
        throw new Error('Los parámetros file, fileName y mimeType son obligatorios.');
    }

    const data = decodeBase64(file);
    const blob = createBlob(data, mimeType);
    createDownloadLink(blob, fileName);
}

/**
 * Quita los acentos y las ñ para poder comparar
 * cadenas
 * @param {String} cadena
 * @returns {String}
 */
function normalizarCadena(cadena) {
    if (cadena != "") {
        if (!cadena || typeof cadena != 'string') {
            throw new Error('El parámetro cadena es requerido y debe ser de tipo string.');
        }

        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
        return cadena
    }
}

/**
 * Verificar si un objecto esta vacio
 * @param {Object} objeto a evaluar
 * @return {Boolean}  (true|false)
 */
function objectEmpty(object) {
    return !Object.keys(object ?? {}).length > 0;
}


/**
 * Convierte una fecha en formato de cadena (string) con formato ISO (yyyy-mm-ddThh:mm:ss.sssZ) en una fecha con formato "dd-mm-yyyy"
 * @param {string} dateString - La cadena de fecha a convertir en formato ISO (yyyy-mm-ddThh:mm:ss.sssZ).
 * @param {boolean} [includeHour=false] - Un indicador opcional para incluir o no la hora en el resultado. El valor por defecto es `false`.
 * @returns {string} Una cadena de fecha en formato "dd-mm-yyyy" con opcionalmente la hora, en formato "hh:mm:ss".
 * @throws {Error} Si `dateString` es null, un string vacío o no es una cadena de texto.
 */
function formatDate(dateString, includeHour = false) {
    if (!dateString || dateString === '' || typeof dateString != 'string') {
        throw new Error('El parámetro dateString es requerido y debe ser de tipo string.')
    }

    const dateSplitted = dateString.split(' ')[0].split('-');
    const dateAuxiliar = `${dateSplitted[2]}-${dateSplitted[1]}-${dateSplitted[0]}`

    if (includeHour) {
        return dateAuxiliar.concat(dateSplitted.split(' ')[1]);
    } else {
        return dateAuxiliar;
    }
}

/**
 * Formatea un número como moneda en formato USD.
 *
 * @param {number|string} entry - El valor a formatear como moneda. Debería ser un número o una cadena que se pueda analizar como un número.
 * @param {boolean} [includeSymbol=true] - Si se debe incluir el símbolo de la moneda en la cadena formateada.
 * @returns {string} La cadena de moneda formateada.
 * @throws {Error} Si entry es nulo o una cadena vacía.
 */
function getCurrencyFormat({ entry, includeSymbol = true }) {
    if (entry === '' && entry === null) {
        throw new Error('El parámetro entry es requerido');
    }

    const value = typeof entry === 'string' ? parseFloat(entry.replaceAll(",", "")) : entry;

    if (isNaN(value)) {
        throw new Error('El parámetro entry debe ser un número o una cadena que se pueda analizar como un número');
    }

    const symbol = includeSymbol ? "$ " : "";
    const formatter = new Intl.NumberFormat("en-US", {
        type: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return symbol + formatter.format(value);
}

/**
 * Recibe 2 parametros (mss, son los milisegundos
 * resultado de restar las 2 fechas) (tipo: full-devuelve la cadena completa de diferencia
 * con el formato 00d 00h 00m; day-devuelve solamente los días 00d; hour-devuelve solamente las horas 00h;
 * minute-devuelve solamente los minutos 00m; default-devuelve la cadena por orden si es mayor a cero )
 *
 * @param {*} mss 
 * @param {*} tipo 
 * @returns 
 */
function obtenerDiferenciaFechas(mss, tipo = "") {

    if (mss === undefined || mss === '' || mss === "null") {
        throw new Error('El parametro mss es requerido')
    }

    let result = "";

    const days = parseInt(mss / (1000 * 60 * 60 * 24));
    const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = parseInt(mss % (1000 * 60)) / 1000;
    const hoursResult = (days * 24) + hours;
    const minutesResult = (hoursResult * 60) + minutes;

    switch (tipo) {
        case "full":
            result = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            break;

        case "full-hour":
            result = (String(hours).length === 1 ? ("0" + hours) : hours) + ":" + (String(minutes).length === 1 ? ("0" + minutes) : minutes) + ":" + (String(seconds).length === 1 ? ("0" + seconds) : seconds);
            break;

        case "full-hour-text":
            result = (String(hours).length === 1 ? ("0" + hours) : hours) + "h " + (String(minutes).length === 1 ? ("0" + minutes) : minutes) + "m " + (String(seconds).length === 1 ? ("0" + seconds) : seconds) + "s";
            break;

        case "full-day-hour":
            result = (String(days).length === 1 ? ("0" + days) : days) + ":" + (String(hours).length === 1 ? ("0" + hours) : hours) + ":" + (String(minutes).length === 1 ? ("0" + minutes) : minutes) + ":" + (String(seconds).length === 1 ? ("0" + seconds) : seconds);
            break;

        case "day":
            result = `${days}d`;
            break;

        case "hour":
            result = `${hoursResult}h`;
            break;

        case "minute":
            result = `${minutesResult}m`;
            break;

        case "second":
            result = `${seconds.toFixed(0)}s`;
            break;

        default:
            if (days > 0) {
                result = `${days} día(s)`;
            } else if (hours > 0) {
                result = `${hours} hora(s)`;
            } else if (minutes > 0) {
                result = `${minutes} minuto(s)`;
            } else if (seconds > 0) {
                result = `${seconds.toFixed(0)} segundo(s)`;
            } else {
                result = "0 segundo(s)"
            }
            break;
    }

    return result;
}

/**
 * Convierte un archivo a su representación en base64 utilizando Promises.
 * @param {File} file - El archivo que se va a convertir a base64.
 * @returns {Promise<string>} Una Promesa que resuelve en el string en formato base64.
 * @throws {Error} Si `file` es null o undefined.
 */
function getPromiseBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            resolve(base64String)
        };
        reader.onerror = (error) => {
            reject(error)
        }
    });
}
/**
 * Convierte un archivo a su representación en base64 utilizando Promises.
 * @param {File} file - El archivo que se va a convertir a base64.
 * @returns {Promise<{b64: string}>} Una Promesa que resuelve en un objeto con el string en formato base64.
 * @throws {Error} Si `file` es null o undefined.
 */
async function parseDocToBase64(file) {

    if (!file) {
        throw new Error('El parámetro file es requerido')
    }

    const documento = {
        b64: "",
    };

    documento.b64 = await getPromiseBase64(file);
    return documento;
}

/**
 * Genera una cadena aleatoria de longitud dada, que puede contener letras mayúsculas,
 * minúsculas, números y caracteres especiales.
 * @param {number} [length=0] - Longitud de la cadena a generar.
 * @param {boolean} [numbers=false] - Si se deben incluir números en la cadena.
 * @param {boolean} [lowCase=false] - Si se deben incluir letras minúsculas en la cadena.
 * @param {boolean} [specials=false] - Si se deben incluir caracteres especiales en la cadena.
 * @returns {string} Cadena aleatoria generada.
 */
function generateRandomString({
    length = 0,
    numbers = false,
    lowCase = false,
    specials = false,
}) {
    if (typeof length !== 'number' || length <= 0) {
        throw new Error('El parametro length debe ser numérico y mayor a cero.');
    }

    const UPPER_CASE_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const LOWER_CASE_STRING = "abcdefghijklmnopqrstuvwxyz"
    const NUMBERS_STRING = "0123456789";
    const SPECIALS_STRING = "_#?!@$%^&*";

    let characters = UPPER_CASE_STRING;
    let cadena = '';

    if (numbers) {
        characters = characters.concat(NUMBERS_STRING);
    }

    if (lowCase) {
        characters = characters.concat(LOWER_CASE_STRING);
    }

    if (specials) {
        characters = characters.concat(SPECIALS_STRING);
    }

    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        cadena += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return cadena;
}

/**
 * Función que ordena un array de objetos por una propiedad específica
 * utilizando el algoritmo de quicksort.
 * @param {Array} array - El array a ordenar.
 * @param {string} prop - La propiedad del objeto por la que se va a ordenar.
 * @returns {Array} El array ordenado.
 */
function ordenarArray(array, prop, reverse) {
    if (array.length <= 1) {
        return array;
    }

    const pivotIndex = Math.floor(array.length / 2);
    const pivotValue = array[pivotIndex][prop];
    const lesser = [];
    const greater = [];

    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) {
            continue;
        }

        if (array[i][prop] < pivotValue) {
            lesser.push(array[i]);
        } else {
            greater.push(array[i]);
        }
    }

    let result = [
        ...ordenarArray(lesser, prop),
        array[pivotIndex],
        ...ordenarArray(greater, prop),
    ];

    if (reverse) {
        result = result.reverse();
    }

    return result;
}

function searchMenuItem(name) {
    let menuItems = config.MENU_ITEMS_ARRAY;
    let item = {};

    menuItems.forEach(menuItem => {
        if (menuItem.href) {
            if (menuItem.href.name == name) {
                item = menuItem;
            }
        }
    });

    return item;
}
function addSuggestion(item) {
    if (!item.children) {

        appStorage.setMenuActive(item.path);

        let existe = false;
        let sugerencias = appStorage.getLearnList();

        if (item.id) {
            if (sugerencias) {
                let arraySugerencias = sugerencias;

                for (let index = 0; index < arraySugerencias.length; index++) {
                    let element = arraySugerencias[index];
                    let elementAux = {};

                    if (index + 1 <= arraySugerencias.length) {
                        elementAux = arraySugerencias[index + 1];
                    }

                    if (element.id == item.id) {
                        if (element.weight < 10) {
                            element.weight += 1;
                            if (elementAux && elementAux.weight) {
                                elementAux.weight -= 1;
                            }
                        }
                        item = element;
                        existe = true;
                    }
                }

                if (!existe) {
                    item.weight = 1;
                    arraySugerencias.push(item);
                }

                appStorage.setLearnList(arraySugerencias);
            } else {
                let newArray = [];
                item.weight = 1;
                newArray.push(item);

                appStorage.setLearnList(newArray);
            }
        }
    }
}
function getSuggestions() {
    let sugerencias = appStorage.getLearnList()
    let topSugerencias = [];

    if (sugerencias) {
        let arraySugerencias = sugerencias;

        arraySugerencias.sort(((a, b) => b.weight - a.weight));

        let limite = arraySugerencias.length >= 10 ? 10 : arraySugerencias.length;

        for (let i = 0; i < limite; i++) {
            let element =
            {
                title: arraySugerencias[i].name,
                src: arraySugerencias[i].href,
            };

            topSugerencias.push(element);
        }
    }

    return topSugerencias;
}

/**
 * Devuelve la lista de rutas de autorización del perfil del usuario actual.
 *
 * @returns {Array} Lista de rutas de autorización del perfil del usuario actual.
 */
function getRutasPerfil() {
    let storageUser = appStorage.getUser() ? appStorage.getUser() : {};
    let clavePerfil = storageUser.ccPerfil ? storageUser.ccPerfil.clave : "";
    let listaPerfiles = config.PERFILES_AUTH;
    let rutas = [];

    console.log(clavePerfil, storageUser, listaPerfiles);

    listaPerfiles.forEach(perfil => {
        if (perfil.clave === clavePerfil) {
            rutas = perfil.permisos;
        }
    });

    return rutas;
}
function rutaAutorizada(ruta) {
    let rutasUsuario = getRutasPerfil();

    for (let index = 0; index < rutasUsuario.length; index++) {
        const element = rutasUsuario[index];
        if (element === ruta.id) {

            return true;
        }
    }
}
function obtenerPermisosRuta(ruta) {
    let rutasUsuario = getRutasPerfil();

    for (let i = 0; i < rutasUsuario.length; i++) {
        const rutaUsuario = rutasUsuario[i];

        if (rutaUsuario.submenuId === ruta.id) {
            return rutaUsuario.permiso;
        }
    }
}

function capitalizarCadena(string) {
    return string.charAt(0).toUpperCase().concat(string.slice(1).toLowerCase());
}

function decodeBase64(base64) {
    return Uint8Array.from(atob(base64).split("").map((char) => char.charCodeAt(0)));
}
function createBlob(data, type) {
    return new Blob([data], { type });
}
function createDownloadLink(blob, name) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
}
/**
 * Función que toma un valor de color hexadecimal como argumento y devuelve el color de contraste correspondiente.
 * 
 * @param {string} hexColor - Cadena hexadecimal del color.
 * @returns {string} 'white' o 'black' dependiendo de cual corresponda.
 */
function getContrastColor(hexColor) {
    if (!hexColor || typeof hexColor != 'string') {
        throw new Error('El parametro hexColor es requerido y debe ser string.');
    }

    const hexColorTransform = hexColor.replace("#", "");
    const red = parseInt(hexColorTransform.substr(0, 2), 16);
    const green = parseInt(hexColorTransform.substr(2, 2), 16);
    const blue = parseInt(hexColorTransform.substr(4, 2), 16);

    const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

    const contrastColor = luminance > 0.5 ? 'black' : 'white';

    return contrastColor;
}

/**
 * Redondea la parte fraccionaria de un número
 * solo cuando ésta es mayor a 2 dígitos.
 *
 * @param {number} number: número a redondear
 * @param {number} max: máximo de dígitos fraccionales
 */
function redondearNumero(number, max = 2) {
    if (typeof number !== 'number' || isNaN(number)) {
        throw new TypeError('Número inválido: ' + number);
    }

    if (typeof max !== 'number' || isNaN(max)) {
        throw new TypeError('Máximo de dígitos inválido: ' + max);
    }

    let fractionalPart = number.toString().split('.')[1];

    if (!fractionalPart || fractionalPart.length <= 2) {
        return number;
    }

    return Number(number.toFixed(max));
}

/**
 * Verificar si un objecto esta vacio
 * @param {Object} objeto a evaluar
 * @return {Boolean}  (true|false)
 */
function isEmpty(object) {
    return !Object.keys(object ?? {}).length > 0;
}
function convertirMinutosADiasHorasYMinutos(minutos) {
    let dias = Math.floor(minutos / 1440); // 1 día tiene 1440 minutos
    let horas = Math.floor((minutos % 1440) / 60); // 1 hora tiene 60 minutos
    let minutosRestantes = Math.floor(minutos % 60);
    let diaString = dias.toString().padStart(2, "0");
    let horasString = horas.toString().padStart(2, "0");
    let minutosString = minutosRestantes.toString().padStart(2, "0");

    return diaString + ":" + horasString + ":" + minutosString;
}

function calcularEdad(fecha) {
    if (!fecha) {
        throw new Error('El parámetro fecha debe ser una fecha válida')
    }

    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

/**
 * 
 * @returns color random para texto blanco unicamente
 */
function getRandomColorWithWhiteText(maxAttempts = 100) {
    let attempts = 0;

    while (attempts < maxAttempts) {
        // Genera valores aleatorios para los componentes RGB (rojo, verde, azul)
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Calcula la luminosidad del color usando la fórmula YIQ
        const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Si el color tiene suficiente contraste con el texto blanco (luminosidad < 0.7), lo devuelve
        if (luminosity < 0.7) {
            // Convierte los valores RGB en una cadena hexadecimal y la devuelve
            const colorHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
            return colorHex;
        }

        attempts++;

        if (attempts === maxAttempts) {
            // Si alcanza el límite de intentos, devuelve un mensaje de error o el último color generado
            console.error("No se pudo generar un color con contraste adecuado.");
            return null;
        }
    }
}

/**
 * 
 * @param {*} date 
 * @returns Devuelve una cadena con la fecha y la hora en texto.
 */
function formatDateTime(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    return date.toLocaleDateString(undefined, options);
}

/**
 * se encarga de recibir los mensajes del socket y procesarlos de tal manera que 
 * a cada canal le corresponda una acción diferente
 */
function handleSocketMessage({
    socketBody,
    dispatch
}) {
    const usuarioLocal = appStorage.getUser();
    if (usuarioLocal && usuarioLocal.id) {
        const usuarioLocalId = usuarioLocal.id;
        const perfilUsuarioLocal = usuarioLocal.ccPerfil;
        const clavePerfilUsuarioLocal = perfilUsuarioLocal.clave;
        const mapPerfiles = {
            "02": "cliente",
            "03": "agente",
        };

        if (socketBody) {
            const cadenaMensaje = socketBody.mensaje;

            if (cadenaMensaje.length > 0) {
                const arrayCadenaMensaje = cadenaMensaje.split("/");
                const modulo = arrayCadenaMensaje[0];
                const perfil = arrayCadenaMensaje[1];
                //const objetivo = arrayCadenaMensaje[2];

                if (modulo === "sesiones") {
                    if (mapPerfiles[clavePerfilUsuarioLocal] === perfil) {
                        if (perfil === "agente", dispatch) console.log("socket perfil 1", dispatch, usuarioLocalId);

                        if (perfil === "cliente") console.log("socket perfil 2", dispatch, usuarioLocalId);
                    }
                }
            }
        }
    }
}

/**
 * 
 * @param {*} mss 
 * @param {*} devolverHora 
 * @returns la fecha completa en formato "yyyy-mm-dd hh-mm-ss"
 */
function formatDateAnioFirst(mss, devolverHora = true) {
    let fecha = "";

    let d = new Date(Number(mss));
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let yy = d.getFullYear();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    dd = dd < 10 ? "0" + dd : dd;
    mm = mm < 10 ? "0" + mm : mm;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;


    if (!devolverHora) {
        fecha = yy + '-' + mm + '-' + dd;
    } else {
        fecha = yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
    }

    return fecha.replace(",", "");
}

function corregirCadena(cadena) {
    // Reemplazar vocales con acento por sus variantes sin acento
    cadena = cadena.replace(/[áäâàÁÄÂÀ]/g, 'a');
    cadena = cadena.replace(/[éëêèÉËÊÈ]/g, 'e');
    cadena = cadena.replace(/[íïîìÍÏÎÌ]/g, 'i');
    cadena = cadena.replace(/[óöôòÓÖÔÒ]/g, 'o');
    cadena = cadena.replace(/[úüûùÚÜÛÙ]/g, 'u');

    // Reemplazar ñ por "-n-"
    cadena = cadena.replace(/ñÑ/g, '-n-');

    return cadena;
}

function restaurarEnie(cadena) {
    // Reemplazar "-n-" por "ñ"
    if (cadena != "") {
        cadena = cadena.replace(/-n-/g, 'ñ');

        return cadena;
    } else {
        return "";
    }
}

export {
    handleResponseConvert,
    getFechaActual,
    capitalizarCadena,
    decodeBase64,
    createBlob,
    createDownloadLink,
    descargarArchivoFromB64,
    getRutasPerfil,
    normalizarCadena,
    objectEmpty,
    addSuggestion,
    getSuggestions,
    searchMenuItem,
    formatDate,
    getCurrencyFormat,
    obtenerDiferenciaFechas,
    parseDocToBase64,
    generateRandomString,
    obtenerPermisosRuta,
    ordenarArray,
    getContrastColor,
    redondearNumero,
    isEmpty,
    convertirMinutosADiasHorasYMinutos,
    rutaAutorizada,
    calcularEdad,

    getRandomColorWithWhiteText,
    formatDateTime,

    handleSocketMessage,
    formatDateAnioFirst,

    // correccion de acentos y ñ
    corregirCadena,
    restaurarEnie,
}
