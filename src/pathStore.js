import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);
// app specific state goes here
const app = {
    state: {
        isOnline: true,
        isLoggedIn: false,
        mini: false,
        showErrorDialog: false,
        errorCount: 0
    },
    mutations: {
        _updateLogin(state, val) {
            state.isLoggedIn = val;
        },
        _updateIsOnline(state, val) {
            state.isOnline = val;
        },
        _updateMini(state, val) {
            state.mini = val;
        },
        _updateErrorDialog(state, val) {
            state.showErrorDialog = val;
        },
        _updateErrorCount(state, val) {
            state.errorCount++;
        }
    },
    getters: {
        isOnline: state => {
            return state.isOnline;
        },
        isLoggedIn: state => {
            return state.isLoggedIn;
        },
        showErrorDialog: state => {
            return state.showErrorDialog;
        },
        errorCount: state => {
            return state.errorCount;
        }
    },
    actions: {
        updateIsOnline: (context, value) => {
            context.commit("_updateIsOnline", value);
        },
        updateLogin: (context, value) => {
            context.commit("_updateLogin", value);
        },
        updateShowErrorDialog: (context, value) => {
            context.commit('_updateErrorDialog', value)
        },
        updateErrorCount: (context, value) => {
            context.commit('_updateErrorCount', value);
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
        AccountId: null,
        HostUserName: null,
        PassWord: null,
        hash: null
    },
    getters: {
        accountId: state => {
            return state.AccountId;
        },
        userId: state => {
            return state.Id;
        },
        baseUrl: state => {
            let hostUserName = state.HostUserName || '',
                firstIndex = hostUserName.split('/')[0],
                isLocalHost = hostUserName.indexOf("local") >= 0,
                protocol = isLocalHost ? 'HTTP' : 'HTTPS';

            return `${protocol}://${firstIndex}`;
        },
        hostAndUserName: state => {
            return state.HostUserName;
        },
        userName: state => {
            let hostUserName = state.HostUserName || '';
            return hostUserName.split('/')[1];
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
        },
        _updateAccountId(state, val) {
            state.AccountId = val;
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
        },
        updateAccountId: (context, value) => {
            context.commit("_updateAccountId", value);
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
            this.dispatch("updateAccountId", null);
        }
    },
    //actions are asynchronous
    actions: {
        resetState: (context, value) => {
            context.commit("_resetState", null);
        }
    }
});
