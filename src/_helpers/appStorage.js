import storage from 'store2';

// clave para almacenar en local storage los datos
const MENU_ACTIVE = "MENU_ACTIVE";
const COME_FROM_LOGIN = "FROM_LOGIN";
const LOGIN_DATE = 'TOKEN_DATE';
const DARK_MODE = "DARK_MODE";
const USER = 'USER';
const TOKEN = 'TOKEN';
const TICK_WAIT = "TICK_WAIT";
const MENU_TYPE = "MENU_TYPE";

export const appStorage = {
    // come from login actions
    setComeFromLogin(val) {
        storage.set(COME_FROM_LOGIN, val);
    },
    getComeFromLogin() {
        return storage.get(COME_FROM_LOGIN);
    },
    removeComeFromLogin(v) {
        if (!v)
            storage.remove(COME_FROM_LOGIN);
    },

    // menu actions
    setMenuActive(val) {
        storage.set(MENU_ACTIVE, val);
    },
    getMenuActive() {
        return storage.get(MENU_ACTIVE);
    },
    removeMenuActive(v) {
        if (!v)
            storage.remove(MENU_ACTIVE);
    },

    // menu type
    setMenuType(val) {
        storage.set(MENU_TYPE, val);
    },
    getMenuType() {
        return storage.get(MENU_TYPE);
    },
    removeMenuType(v) {
        if (!v)
            storage.remove(MENU_TYPE);
    },

    // User actions
    setUser(val) {
        storage.set(USER, val);
    },
    getUser() {
        return storage.get(USER);
    },
    removeUser(v) {
        if (!v)
            storage.remove(USER);
    },

    // Login Date actions
    setLoginDate(val) {
        storage.set(LOGIN_DATE, val);
    },
    getLoginDate() {
        return storage.get(LOGIN_DATE);
    },
    removeLoginDate(v) {
        if (!v)
            storage.remove(LOGIN_DATE);
    },

    // Token actions
    setToken(val) {
        storage.set(TOKEN, val);
    },
    getToken() {
        return storage.get(TOKEN);
    },
    removeToken(v) {
        if (!v)
            storage.remove(TOKEN);
    },

    // Tick Wait actions
    setTickWait(val) {
        storage.set(TICK_WAIT, val);
    },
    getTickWait() {
        return storage.get(TICK_WAIT);
    },
    removeTickWait(v) {
        if (!v || v)
            storage.remove(TICK_WAIT);
    },

    // DarkMode actions
    setDarkMode(val) {
        storage.set(DARK_MODE, val);
    },
    getDarkMode() {
        return storage.get(DARK_MODE);
    },
    removeDarkMode(v) {
        if (!v)
            storage.remove(DARK_MODE);
    },

    logout() {
        this.removeUser();
        this.removeToken();
        this.removeLoginDate();
    },

    reset() {
        this.removeMenuActive();
        this.removeUser();
        this.removeToken();
        this.removeLoginDate();
        this.removeTickWait();
        this.removeDarkMode();
    },
}
