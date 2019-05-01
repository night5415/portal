import PouchDB from "pouchdb-browser";
import DbFind from "pouchdb-find";
import SimpleCrypto from "simple-crypto-js";
import { dataStore } from "@/statics/pathConstants";

let _participantDb = null,
    _accountDb = null,
    _sessionDb = null,
    _invoiceDb = null,
    _skillDb = null,
    _calendarDb = null,
    _exceptionDb = null,
    _loginDb = null,
    _crpto = null;

let pathDb = {
    remoteCouch: false,
    install(Vue) {
        let self = this;
        self.create();
        //this exposes functions on the $pathVue.$pathPouch
        //object.
        Vue.prototype.$pathPouch = {
            setEncryptionKey: seed => {
                _crpto = new SimpleCrypto(seed);
            },
            login: {
                save: _loginDb.save,
                saveOrUpdate: _loginDb.saveOrUpdate,
                getById: _loginDb.getById,
                getAll: _loginDb.getAll,
                _db: _loginDb
            },
            account: {
                save: _accountDb.save,
                saveOrUpdate: _accountDb.saveOrUpdate,
                getById: _accountDb.getById,
                getAll: _accountDb.getAll,
                _db: _accountDb
            },
            participant: {
                save: _participantDb.save,
                saveOrUpdate: _participantDb.saveOrUpdate,
                getById: _participantDb.getById,
                getByFirstName: _participantFunc.getByFirstName,
                getAll: _participantDb.getAll,
                getRowCount: _participantDb.getRowCount,
                _db: _participantDb
            },
            session: {
                save: _sessionDb.save,
                saveOrUpdate: _sessionDb.saveOrUpdate,
                getAll: _sessionDb.getAll,
                getRowCount: _sessionDb.getRowCount,
                _db: _sessionDb
            },
            skill: {
                save: _skillDb.save,
                saveOrUpdate: _skillDb.saveOrUpdate,
                getAll: _skillDb.getAll,
                getRowCount: _skillDb.getRowCount,
                _db: _skillDb
            },
            invoice: {
                save: _invoiceDb.save,
                saveOrUpdate: _invoiceDb.saveOrUpdate,
                getAll: _invoiceDb.getAll,
                getRowCount: _invoiceDb.getRowCount,
                _db: _invoiceDb
            },
            calendar: {
                save: _calendarDb.save,
                saveOrUpdate: _calendarDb.saveOrUpdate,
                getAll: _calendarDb.getAll,
                getRowCount: _calendarDb.getRowCount,
                _db: _calendarDb
            },
            exceptions: {
                save: _exceptionFunc.save,
                saveOrUpdate: _exceptionDb.saveOrUpdate,
                getAll: _exceptionFunc.getAll,
                clear: _exceptionFunc.clear,
                export: _exceptionFunc.export,
                getRowCount: _exceptionDb.getRowCount,
                _db: _exceptionDb
            }
        };
    },

    /**
     * This is the entry point for creating our local PouchDB instances 
     */
    create: function () {
        //initialize DB's and add plugins
        dbConfig.init();
        //setup DB's based on a config.
        _exceptionDb = dbConfig.exceptions();
        _participantDb = dbConfig.participant();
        _loginDb = dbConfig.logins();
        _accountDb = dbConfig.account();
        _sessionDb = dbConfig.sessions();
        _skillDb = dbConfig.skills();
        _calendarDb = dbConfig.calendar();
        _invoiceDb = dbConfig.invoices();
    }
};
/** 
 * This is the the config object for all the DB's
*/
let dbConfig = {
    init: function () {
        //add any plugins to ALL Db's
        PouchDB.plugin(DbFind)
            .plugin({ save: pouchPlugins.save })
            .plugin({ saveOrUpdate: pouchPlugins.saveOrUpdate })
            .plugin({ getById: pouchPlugins.getById })
            .plugin({ getAll: pouchPlugins.getAll })
            .plugin({ getRowCount: pouchPlugins.getRowCount });

        //add events
        // PouchDB.on("created", function (dbName) {
        //     console.log(`db ${dbName} created`);
        // });
        // PouchDB.on("destroyed", function (dbName) {
        //     console.log(`db ${dbName} destroyed`);
        // });
    },
    participant: function () {
        let self = this,
            db = new PouchDB(dataStore.participant, { revs_limit: 1, auto_compaction: true });
        // db.changes({
        //     since: 'now',
        //     live: true,
        //     include_docs: true
        // }).on('change', function (change) {
        //     // handle change
        // }).on('complete', function (info) {
        //     // changes() was canceled
        // }).on('error', function (err) {
        //     console.log(err);
        // }); 

        return db;
    },
    exceptions: function () {
        let db = new PouchDB(dataStore.exceptions, { revs_limit: 1, auto_compaction: true });
        db.unprotected = true;
        // db.createIndex({
        //     index: {
        //         fields: ["userId"]
        //     }
        // });
        return db;
    },
    sessions: function () {
        let db = new PouchDB(dataStore.sessions, { revs_limit: 1, auto_compaction: true });
        // db.createIndex({
        //     index: {
        //         fields: ["userId"]
        //     }
        // });
        return db;
    },
    skills: function () {
        let db = new PouchDB(dataStore.skills, { revs_limit: 1, auto_compaction: true });
        // db.createIndex({
        //     index: {
        //         fields: ["userId"]
        //     }
        // });
        return db;
    },
    calendar: function () {
        let db = new PouchDB(dataStore.calendar, { revs_limit: 1, auto_compaction: true });
        // db.createIndex({
        //     index: {
        //         fields: ["userId"]
        //     }
        // });
        return db;
    },
    logins: function () {
        let db = new PouchDB(dataStore.login, { revs_limit: 1, auto_compaction: true });
        // db.createIndex({
        //     index: {
        //         fields: ["userId"]
        //     }
        // });
        return db;
    },
    invoices: function () {
        let db = new PouchDB(dataStore.invoices, { revs_limit: 1, auto_compaction: true });
        // db.createIndex({
        //     index: {
        //         fields: ["userId"]
        //     }
        // });
        return db;
    },
    account: function () {
        let db = new PouchDB(dataStore.account, { revs_limit: 1, auto_compaction: true });
        return db;
    }
};
/** 
 * These object/Func allow us to implement
 * specific behavior for each DB, example would
 * be the exceptionDB which is not encrypted so doesn't
 * follow the same path as the other DB's
*/
let _exceptionFunc = {
    save: function (exObj) {
        let self = this,
            userId = pathVue.$store.getters.userId,
            id = pathVue.$pathUtil.GenerateGuid(),
            errorCount = pathVue.$store.getters.errorCount;

        pathVue.$store.commit('_updateErrorCount', errorCount++);

        return self._db.post({ Id: id, userId: userId, date: new Date(), exception: exObj });
    },
    clear: function () { },
    export: function () { },
    getAll: function () {
        let self = this;

        return self._db.allDocs({ include_docs: true });
    }
};

let _participantFunc = {
    //Returns the first record
    getByFirstName: function (patientName) {
        return _participantDb
            .find({
                selector: {
                    FirstName: patientName
                }
            })
            .then(docs => {
                return Promise.resolve(docs.docs[0]);
            });
    },
    bulkSave: function (patients) {
        var promise = new Promise(function (res, rej) {
            _participantDb
                .bulkDocs(patients)
                .then(function (result) {
                    res(result);
                })
                .catch(function (err) {
                    rej(err);
                });
        });

        return promise;
    },
    delete: function (patient) { },
    export: function () { }
};
// these are added to each DB within their respective context, new plugins must be added
// to PouchDB.plugin above.
let pouchPlugins = {
    getRowCount: function () {
        var self = (this._db || this);
        return self.allDocs().then(rows => {
            return Promise.resolve(rows.total_rows);
        });
    },
    saveOrUpdate: function (obj) {
        var self = (this._db || this),
            unprotected = self.unprotected;

        self.getById(obj.Id).then(origDoc => {
            if (origDoc) {
                origDoc.data = unprotected ? obj : _crpto.encrypt(obj);
                return self.save(origDoc);
            } else {
                return self.save({
                    _id: `${obj.Id}-${pathVue.$store.getters.userId}`,
                    Id: `${obj.Id}-${pathVue.$store.getters.userId}`,
                    userId: pathVue.$store.getters.userId,
                    data: unprotected ? obj : _crpto.encrypt(obj)
                });
            }
        });
    },
    getById: function (objId) {
        let self = (this._db || this);
        return self
            .find({
                selector: {
                    Id: `${objId}-${pathVue.$store.getters.userId}`
                }
            })
            .then(docs => {
                if (docs && docs.docs.length === 0) {
                    return Promise.resolve(undefined);
                } else {
                    let document = docs.docs[0];
                    document.data = _crpto.decrypt(document.data, true);
                    return Promise.resolve(document);
                }
            })
            .catch(e => {
                console.log('error in get by ID', e);
            });
    },
    save: function (obj) {
        let self = (this._db || this);
        return self.put(obj);
    },
    getAll: function () {
        let self = (this._db || this),
            userId = pathVue.$store.getters.userId;

        return self.allDocs({ include_docs: true })
            .then(pars => {
                pars.rows.forEach((item, index, object) => {
                    if (item.doc.userId === userId) {
                        item.doc.data = _crpto.decrypt(item.doc.data, true);
                    } else {
                        object.splice(index, 1);
                    }
                });

                return Promise.resolve(pars);
            });
    }
};

export default pathDb;
