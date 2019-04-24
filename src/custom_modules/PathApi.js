import { toJson } from "really-relaxed-json";
import axios from "axios";
import store from "@/pathStore";
/** 
 * @param {string} baseUrl 
 * @param {GUID} entityId the entity we are getting data for (RESTful).
 */
const api = class Api {
  constructor(baseUrl, entityId) {
    this.baseUrl = baseUrl;
    this.entityId = entityId;
  }

  get participant() {
    let me = this;
    return me._callRestful('guardian', 'portalparticipants');
  }

  get calendar() {
    let me = this;
    return me._callNonRestful('calendar/patientportalcalendar');
  }

  get skill() {
    let me = this;
    return me._callNonRestful('mastery/skillmastery');
  }

  get session() {
    let me = this;
    return me._callNonRestful('session/patientportalsessions');
  }

  get invoice() {
    let me = this;
    return me._callNonRestful('invoiceactivity/patientportalinvoicedetail');
  }

  login(userName, passWord) {
    let formData = new FormData(),
      isOnline = store.getters.isOnline,
      loginApi = `${this.baseUrl}/~api/login`;

    if (!isOnline) {
      return pathVue.$pathUtil.generateKey(`${userName}${passWord}`, `${userName}${passWord}`)
        .then(key => {
          return pathVue.$pathPouch.login.getById(key);
        })
        .then(login => {
          let data = login.data;
          store.dispatch("updateSecurityToken", data.securityToken);
          return Promise.resolve(data.Person);
        });
    } else {
      formData.append("loginUserName", userName);
      formData.append("loginPassword", passWord);
      formData.append("timeZone", "America/Chicago"); // will need to figure this out
      formData.append("subMode", "pathfinder");

      return axios.post(loginApi, formData).then(response => {
        if (response.data) {
          const loginInfo = toJson(response.data),
            loginJson = JSON.parse(loginInfo),
            context = loginJson.data.SecurityContext,
            person = context.Person;


          //save to Vuex store
          store.dispatch("updateSecurityToken", loginJson.data.securityToken);
          //save to PouchDB
          let newLogin = JSON.parse(JSON.stringify(context));
          pathVue.$pathUtil.generateKey(`${userName}${passWord}`, `${userName}${passWord}`)
            .then(key => {
              newLogin.Id = key;
              pathVue.$pathPouch.login.saveOrUpdate(newLogin);
            })

          return Promise.resolve(person);
        }
      });
    }
  }

  participantImage() {
    let me = this;
    return me._callRestful('participant', 'profilepic')
      .then((result) => {
        if (result && result.status === 200 && result.data.totalRecords >= 1) {
          return Promise.resolve(result.data.data[0].PublicUrl);
        } else {
          return Promise.resolve('');
        }
      });
  }

  /** 
   * private methods
  */
  _callRestful(service, endpoint) {
    return axios.get(`${this.baseUrl}/~api/${service}/${this.entityId}/${endpoint}`, {
      params: {
        securityToken: store.getters.Token,
        page: 1,
        start: 0,
        limit: -1
      }
    });
  }

  _callNonRestful(endpoint) {
    return axios.get(`${store.getters.baseUrl}/~api/${endpoint}`, {
      params: {
        securityToken: store.getters.Token,
        guardianid: this.entityId,
        page: 1,
        start: 0,
        limit: -1
      }
    });
  }
};

export { api };
