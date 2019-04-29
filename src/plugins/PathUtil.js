import router from "@/router";
import store from "@/pathStore";
import axios from "axios";
import { api } from "@/custom_modules/PathApi";

const PathUtil = {
  install(Vue) {
    Vue.prototype.$pathUtil = {
      /**
       * This will check to see if the browser has the
       * capability to run the app..
       */
      CheckBrowserCompatability: function () {
        return Promise.resolve(true);
      },

      GenerateGuid: function () {
        function _p8(s) {
          var p = (Math.random().toString(16) + "000000000").substr(2, 8);
          return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
      },
      /** 
       * 
       */
      Login: function (userName, passWord) {
        let _api = new api(pathVue.$store.getters.baseUrl);
        return _api.login(userName, passWord);
      },
      /**
       *
       * @param {*} params
       */
      LogOut: function (params) {
        var self = this;
        store.dispatch("resetState", null);
        self.Navigate("/");
      },
      /**
       * pass in a valid path to auto navigate
       * @param {string} path - where to navigate to
       */
      Navigate: function (path) {
        router.push(path);
      },
      /**
       * 
       */
      generateKey: (userName, passWord) => {
        var arrayBufferToHexString = arrayBuffer => {
          var byteArray = new Uint8Array(arrayBuffer);
          var hexString = "";
          var nextHexByte;

          for (var i = 0; i < byteArray.byteLength; i++) {
            nextHexByte = byteArray[i].toString(16);
            if (nextHexByte.length < 2) {
              nextHexByte = "0" + nextHexByte;
            }
            hexString += nextHexByte;
          }
          return hexString;
        };
        var stringToArrayBuffer = string => {
          var encoder = new TextEncoder("utf-8");
          return encoder.encode(string);
        };

        // First, create a PBKDF2 "key" containing the password
        return window.crypto.subtle
          .importKey(
            "raw",
            stringToArrayBuffer(passWord),
            {
              name: "PBKDF2"
            },
            false,
            ["deriveKey"]
          ) // Derive a key from the password
          .then(function (baseKey) {
            return window.crypto.subtle.deriveKey(
              {
                name: "PBKDF2",
                salt: stringToArrayBuffer(userName),
                iterations: 100,
                hash: "SHA-256"
              },
              baseKey,
              {
                name: "AES-CBC",
                length: 128
              }, // Key we want
              true, // Extrable
              ["encrypt", "decrypt"] // For new key
            );
          }) // Export it so we can display it
          .then(function (aesKey) {
            return window.crypto.subtle.exportKey("raw", aesKey);
          }) // Display it in hex format
          .then(function (keyBytes) {
            return arrayBufferToHexString(keyBytes);
          });
      },
      /**
       * 
       */
      downloadFile: (url, fileName, fileType) => {
        return axios({
          url: `${pathVue.$store.getters.baseUrl}/${url}`,
          method: 'GET',
          responseType: 'blob',
          params: {
            securityToken: pathVue.$store.getters.Token,
            downloadId: pathVue.$pathUtil.GenerateGuid()
          }
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data])),
            link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${fileName}.${fileType}`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
      }
    };
  }
};

export default PathUtil;
