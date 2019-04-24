import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// app specific state goes here
const app = {
    state: {
        dark: true,
        isOnline: true,
        isLoggedIn: false,
        baseUrl: 'https://test-lighthouse.abpathfinder.net', //depricated
        mini: false
    },
    mutations: {
        _updateLogin(state, val) {
            state.isLoggedIn = val;
        },
        _updateIsOnline(state, val) {
            state.isOnline = val;
        },
        _updateDark(state, val) {
            state.dark = val;
        },
        _updateMini(state, val) {
            state.mini = val;
        },
        _updateBaseUrl(state, val) {
            state.baseUrl = val;
        }
    },
    getters: {
        Dark: state => {
            return state.dark;
        },
        isOnline: state => {
            return state.isOnline;
        },
        isLoggedIn: state => {
            return state.isLoggedIn;
        },
        baseUrl: state => {
            return state.baseUrl;
        },
        mini: state => {
            return state.mini;
        }
    },
    actions: {
        updateIsOnline: (context, value) => {
            context.commit("_updateIsOnline", value);
        },
        updateLogin: (context, value) => {
            context.commit("_updateLogin", value);
        },
        updateDark: (context, value) => {
            context.commit("_updateDark", value);
        },
        updateMini: (context, value) => {
            context.commit("_updateMini", value);
        },
        updateBaseUrl: (context, value) => {
            context.commit("_updateBaseUrl", value);
        }
    }
};
//security specific state should go here
const security = {
    state: { token: null, encryptionKey: null },
    mutations: {
        _updateSecurityToken(state, val) {
            state.token = val;
        },
        _updateEncryptionKey(state, val) {
            state.encryptionKey = val;
        }
    },
    actions: {
        updateSecurityToken: (context, value) => {
            context.commit("_updateSecurityToken", value);
        },
        updateEncryptionKey: (context, value) => {
            context.commit("_updateEncryptionKey", value);
        }
    },
    getters: {
        Token: state => {
            return state.token;
        },
        Key: state => {
            return state.encryptionKey;
        }
    }
};
//state dealing with the logged in user goes here
const user = {
    state: {
        Id: null,
        HostUserName: 'localhost:9013/night5415',
        PassWord: '11111111',
        hash: null
    },
    getters: {
        userId: state => {
            return state.Id;
        },
        url: state => {
            let firstIndex = state.HostUserName.split('/')[0];
            return `http://${firstIndex}`;
        },
        hostAndUserName: state => {
            return state.HostUserName;
        },
        userName: state => {
            return state.HostUserName.split('/')[1];
        },
        passWord: state => {
            return state.PassWord;
        }
    },
    mutations: {
        _updateUserName(state, val) {
            state.HostUserName = val;
        },
        _updateUserId(state, val) {
            state.Id = val;
        },
        _updatePassWord(state, val) {
            state.PassWord = val;
        }
    },
    actions: {
        updateUserId: (context, value) => {
            context.commit("_updateUserId", value);
        },
        updateUserName: (context, value) => {
            context.commit("_updateUserName", value);
        },
        updatePassWord: (context, value) => {
            context.commit("_updatePassWord", value);
        }
    }
};

// this is the single source of truth for the app,  we can store
// session data here that does not need to be persisted across
// multiple sessions. Persisted data will need to be stored in IndexedDB
export default new Vuex.Store({
    modules: {
        app: app,
        security: security,
        user: user
    },
    //mutations are synchronous
    mutations: {
        _resetState(state, val) {
            this.dispatch("updateLogin", false);
            this.dispatch("updateUserId", null);
            this.dispatch("updateUserName", null);
            this.dispatch("updatePassWord", null);
        }
    },
    //actions are asynchronous
    actions: {
        resetState: (context, value) => {
            context.commit("_resetState", null);
        }
    }
});
