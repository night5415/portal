import Vue from "vue";
import "./plugins/vuetify";
import "material-design-icons-iconfont";
import App from "./App.vue";
import router from "./router";
import store from "./pathStore";
import "./registerServiceWorker";
import Axios from "axios";
import VueAxios from "vue-axios";
import VueMoment from "vue-moment";
import PathDb from "@/plugins/PathDb";
import VueSignaturePad from "vue-signature-pad";

// Components
import './components'

//custom plugin
import PathUtil from "@/plugins/PathUtil.js";
import PathLocation from "@/plugins/PathLocation.js";
import PathFilter from "@/plugins/PathFilter.js";

Vue.use(PathUtil);
Vue.use(PathLocation);
Vue.use(PathFilter);
Vue.use(PathDb);
//custom plugin

Vue.use(VueSignaturePad);
Vue.use(VueAxios, Axios);
Vue.use(VueMoment);
//this is going to need some work
window.onerror = function (messageOrEvent, source, lineno, colno, error) {
    let err = {
        message: messageOrEvent,
        error: {
            code: error.code,
            message: error.message,
            name: error.name,
            stack: error.stack
        },
        source: source,
        line: lineno,
        column: colno
    };

    if (window.pathVue)
        window.pathVue.$pathPouch.exceptions.save(err);

    return true;
};

Vue.config.errorHandler = (error, vm, info) => {
    vm.$pathPouch.exceptions.save({
        message: error.message,
        stack: error.stack
    });
    console.error(error.message, error);
};

Vue.config.warnHandler = function (msg, vm, trace) {
    vm.$pathPouch.exceptions.save({
        message: msg,
        stack: trace
    });
};

// DECLARATION
window.pathVue = new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        version: 1
    },
    created: function () {
        var self = this;
        console.log(`Patient Portal version ${self.version}`);
    },
    // mounted() {
    //     //Add some logging to Promise.Catch
    //     (function (Promise) {
    //         var originalCatch = Promise.prototype.catch;
    //         Promise.prototype.catch = function (e) {
    //             try {
    //                 console.log('> > > > > > called .catch on %o with arguments: %o', this, arguments);
    //                 // if (window.pathVue)
    //                 //     window.pathVue.$pathPouch.exceptions.save(arguments);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //             return originalCatch.apply(this, arguments);
    //         };
    //     })(window.Promise);
    // },
}).$mount("#app");

