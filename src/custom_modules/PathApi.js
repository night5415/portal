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
    let self = this;
    return self._callRestful('guardian', 'portalparticipants');
  }

  get calendar() {
    let self = this;
    return self._callNonRestful('calendar/patientportalcalendar');
  }

  get skill() {
    let self = this;
    return self._callNonRestful('mastery/skillmastery');
  }

  get session() {
    let self = this;
    return self._callNonRestful('session/patientportalsessions');
  }

  get invoice() {
    let self = this;
    return self._callNonRestful('invoiceactivity/patientportalinvoicedetail');
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
  /** 
   * 
  */
  participantImage() {
    let self = this;
    return self._callRestful('participant', 'profilepic')
      .then((result) => {
        if (result && result.status === 200 && result.data.totalRecords >= 1) {
          let p = result.data.data[0];
          return Promise.resolve({
            Id: p.Id,
            PublicUrl: p.PublicUrl,
            Description: p.Description,
            EntityId: p.EntityId,
            LinkId: p.LinkId
          });
        } else {
          return Promise.resolve(undefined);
        }
      });
  }
  /** 
   * 
  */
  saveToAzureStorage(data, linkType, roleId) {
    let self = this,
      formData = new FormData();

    if (!data || !linkType || !roleId)
      throw new error(`To save to Azure, data must have a linktype and roleId`);

    formData.append('file', data);
    return self._post('filemanagement', formData, {
      linkId: self.entityId,
      fileDescription: '',
      autoCreate: true,
      roleId: roleId,
      linkType: linkType
    });
  }

  updateEntity(entity, endpoint, params) {
    let self = this;

    if (!entity || !endpoint)
      throw new error('Updates to Entities require an Entity and an Endpoint');

    return self._put(endpoint, entity, params);
  }

  /** 
   * private methods
  */
  _callRestful(service, endpoint) {
    if (!this.entityId)
      throw new Error(`Restful calls require an entity Id`);

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

  _post(endpoint, data, extraParam = {}) {
    extraParam.securityToken = store.getters.Token
    return axios.post(`${store.getters.baseUrl}/~api/${endpoint}`, data, { params: extraParam });
  }

  _put(endpoint, payload, extraParam = {}) {
    extraParam.securityToken = store.getters.Token;
    return axios.put(`${store.getters.baseUrl}/~api/${endpoint}/${this.entityId}`, payload, { params: extraParam });
  }
};

export { api };
