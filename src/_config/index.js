export const config = {
    URL: import.meta.env.VITE_APP_URL,
    API_URL: import.meta.env.VITE_APP_API_URL,
    SOCKET_URL: import.meta.env.VITE_APP_SOCKET_URL,

    ERROR_COLOR: '#ff2d55',
    SUCCESS_COLOR: '#4cd964',
    WARNING_COLOR: '#FB9A1E',
    INFO_COLOR: '#00B1B7',

    /**
    * Gama de colores para el dark mode y el light mode
    */
    LIGHT: {
        PRIMARY_COLOR: '#006F95',
        SECONDARY_COLOR: '#006F95',
        BACKGROUND_COLOR: '#FFFFFF',
        ACCENT_COLOR: '#006F95',
        ERROR_COLOR: '#ff2d55',
        CUSTOM_BACKGROUND_COLOR: '#f5f5f5',
    },
    DARK: {
        PRIMARY_COLOR: '#006F95',
        SECONDARY_COLOR: '#006F95',
        BACKGROUND_COLOR: '#121212',
        ACCENT_COLOR: '#006F95',
        ERROR_COLOR: '#ff2d55',
        CUSTOM_BACKGROUND_COLOR: '#272727',
    },

    STOMP_CLIENT: null,

    /**
    * En MENU_ITEMS se colocan los objetos de rutas
    */
    MENU_ITEMS: [
        {
            id: 0,
            name: "Home",
            icon: "mdi-home",
            href: { name: "home" },
            path: [0]
        },
    ],

    /**
     * En MENU_ITEMS_ARRAY se tienen que agregar
     * los objetos de ruta individuales
     */
    MENU_ITEMS_ARRAY: [
        {
            id: 0,
            name: "Home",
            href: { name: "home" },
            path: [0]
        },
    ],

    /**
     * En MENU_ITEMS_TITLES se agregan aquí los elementos
     * que tengan la propiedad children
     */
    MENU_ITEMS_TITLES: [
    ],

    /**
     * En PERFILES_AUTH se configura cada perfil
     * con sus respectivas rutas autorizadas
     */
    PERFILES_AUTH: [
        {
            clave: "01", // Perfil 1
            permisos: [
                0,
            ],
        },
        {
            clave: "02", // Perfil 2
            permisos: [
                0,
            ],
        },
        {
            clave: "03", // Perfil 3
            permisos: [
                0,
            ],
        },
    ],
}