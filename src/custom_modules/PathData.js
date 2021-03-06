import { api } from "@/custom_modules/PathApi";
import store from "@/pathStore";
import { dataStore } from "@/statics/pathConstants"

const accountApi = {
    cacheFirst: (comp, dataProp, progress, accountId) => {
        return _private.cache(dataStore.account, comp, dataProp, progress, true)
            .then(() => {
                if (store.getters.isOnline) {
                    return _private.service(dataStore.account, comp, dataProp, null, accountId);
                } else {
                    Promise.resolve(true);
                }
            })
            .catch((err) => {
                return Promise.reject(err);
            })

    },
    networkOnly: (comp, dataProp, accountId) => {
        return _private.service(dataStore.account, comp, dataProp, null, accountId)
            .catch((err) => {
                return Promise.reject(err);
            })
    }
}

const participantApi = {
    /**
     * @param {VueComponent} comp The component which the call is comming from 'This'
     * @param {string} dataProp An Array data property located on the component 
     */
    cacheFirst: (comp, dataProp, progress) => {
        return _private.cache(dataStore.participant, comp, dataProp, progress, true)
            .then(() => {
                if (store.getters.isOnline) {
                    return _private.service(dataStore.participant, comp, dataProp);
                } else {
                    Promise.resolve(true);
                }
            })
            .catch((err) => {
                return Promise.reject(err);
            })

    },
    networkOnly: (comp, dataProp) => {
        return _private.service(dataStore.participant, comp, dataProp)
            .catch((err) => {
                return Promise.reject(err);
            })
    },
    cacheOnly: (comp, dataProp, progress) => {
        return _private.cache(dataStore.participant, comp, dataProp, progress, true)
            .catch((err) => {
                return Promise.reject(err);
            })
    }
}

const sessionApi = {
    /**
     * @param {VueComponent} comp The component which the call is comming from 'This'
     * @param {string} dataProp An Array data property located on the component 
     */
    cacheFirst: (comp, dataProp, progress) => {
        return _private.cache(dataStore.sessions, comp, dataProp, progress, true)
            .then(() => {
                if (store.getters.isOnline) {
                    return _private.service(dataStore.sessions, comp, dataProp);
                } else {
                    Promise.resolve(true);
                }
            })
            .catch((err) => {
                return Promise.reject(err);
            })

    }
}

const skillApi = {
    /**
     * @param {VueComponent} comp The component which the call is comming from 'This'
     * @param {string} dataProp An Array data property located on the component 
     */
    cacheFirst: (comp, dataProp, progress) => {
        return _private.cache(dataStore.skills, comp, dataProp, progress, true)
            .then(() => {
                if (store.getters.isOnline) {
                    return _private.service(dataStore.skills, comp, dataProp);
                } else {
                    Promise.resolve(true);
                }
            })
            .catch((err) => {
                return Promise.reject(err);
            })

    }
}

const invoiceApi = {
    /**
     * @param {VueComponent} comp The component which the call is comming from 'This'
     * @param {string} dataProp An Array data property located on the component 
     */
    cacheFirst: (comp, dataProp, progress) => {
        return _private.cache(dataStore.invoices, comp, dataProp, progress, true)
            .then(() => {
                if (store.getters.isOnline) {
                    return _private.service(dataStore.invoices, comp, dataProp);
                } else {
                    Promise.resolve(true);
                }
            })
            .catch((err) => {
                return Promise.reject(err);
            })

    }
}

const calendarApi = {
    /**
     * @param {VueComponent} comp The component which the call is comming from 'This'
     * @param {string} dataProp An Array data property located on the component 
     */
    cacheFirst: (comp, dataProp, progress) => {
        return _private.cache(dataStore.calendar, comp, dataProp, progress, true)
            .then(() => {
                if (store.getters.isOnline) {
                    return _private.service(dataStore.calendar, comp, dataProp);
                } else {
                    Promise.resolve(true);
                }
            })
            .catch((err) => {
                return Promise.reject(err);
            })

    }
}

const exceptionApi = {
    cacheOnly: (comp, dataProp) => {
        return _private.cache(dataStore.exceptions, comp, null, null, true)
            .catch((err) => {
                return Promise.reject(err);
            })
    }
}

export {
    participantApi,
    exceptionApi,
    sessionApi,
    skillApi,
    calendarApi,
    invoiceApi,
    accountApi
};

const _private = {
    /**
     *  @param {DataBase} db What local database are we looking at? (required)
     *  @param {VueComponent} comp The component which the call is comming from 'This'. (required)
     *  @param {string} [dataProp] the data property in which to place records in. (defaults to dataList)
     *  @param {string} [progress] the data property in which to set our progress int value. (defaults to dataProgress)
     *  @param {bool} [dataOnly] return just data or the whole pouch document. (defaults to false)
     */
    cache: function () {
        var db = arguments[0],
            comp = arguments[1],
            prop = arguments[2] || 'dataList',
            progress = arguments[3] || 'dataProgress',
            dataOnly = arguments[4] || false;

        if (!db)
            return Promise.reject({
                'File': 'PathData.js',
                'LN': 51,
                'Message': 'Database Name is required'
            });

        if (!comp)
            return Promise.reject({
                'File': 'PathData.js',
                'LN': 58,
                'Message': 'Vue Component is required'
            });

        comp[progress] = 10;

        return pathVue.$pathPouch[db].getAll()
            .then((documents) => {
                documents.rows.forEach(document => {
                    let documentOrData = dataOnly ? document.doc.data || document.doc : document;
                    if (documentOrData) {
                        let hasValue = comp[prop].find((data) => {
                            return (data && documentOrData) && (data.Id === documentOrData.Id);
                        });
                        let index = comp[prop].indexOf(hasValue);
                        if (index !== -1) {
                            comp[prop].splice(index, 1, documentOrData);
                        } else {
                            comp[prop].push(documentOrData);
                        }
                    }
                });
                comp[progress] = 50;
                return Promise.resolve(true);
            });
    },
    /** 
      @param {DataBase} db What local database are we looking at? (required)
      @param {VueComponent} comp The component which the call is comming from 'This'. (required)
      @param {string} [dataProp] the data property in which to place records in. (defaults to dataList)
      @param {string} [progress] the data property in which to set our progress int value. (defaults to dataProgress) 
      @param {string} [entityId] the entity we are using for rest calls, (defaults to the current User Id)
    */
    service: function () {
        let db = arguments[0],
            comp = arguments[1],
            prop = arguments[2] || 'dataList',
            progress = arguments[3] || 'dataProgress',
            entityId = arguments[4] || pathVue.$store.getters.userId,
            _api = new api(pathVue.$store.getters.baseUrl, entityId),
            _service;

        if (!comp)
            return Promise.reject({
                'File': 'PathData.js',
                'LN': 233,
                'Message': 'Vue Componenet is required'
            });

        if (!db)
            return Promise.reject({
                'File': 'PathData.js',
                'LN': 240,
                'Message': 'Database Name is required'
            });

        _service = _api[db];

        if (!_service)
            return Promise.reject({
                'File': 'PathData.js',
                'LN': 249,
                'Message': `No mathcing Api for ${db}, Please add a corresponding get() to PathApi.js`
            });
        return _service
            .then(response => {
                //reject promise if not status 200 or no data
                if (response.status !== 200 || !response.data || !response.data.success) {
                    return Promise.reject({
                        'File': 'PathData.js',
                        'LN': 258,
                        'Message': `Server returned a status of ${response.status}`,
                        'response': response
                    });
                } else {
                    response.data.data.forEach((record) => {
                        var currentRecord = comp[prop].find((data) => {
                            return (data && record) && (record.Id === data.Id);
                        });
                        let index = comp[prop].indexOf(currentRecord);
                        if (index !== -1) {
                            comp[prop].splice(index, 1, record);
                        } else {
                            comp[prop].push(record);
                        }
                        pathVue.$pathPouch[db].saveOrUpdate(record);
                    });
                    comp[progress] = 75;
                    return Promise.resolve(comp[prop]);
                }
            });
    }
}