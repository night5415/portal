<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="openAccountProfile"
      persistent
      max-width="800px"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Account</span>
        </v-card-title>
        <v-progress-linear :height="imgLoadingHeight" v-model="dataProgress"></v-progress-linear>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="account.FirstName" label="First name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="account.MiddleName" label="Middle name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="account.LastName" label="Last name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  maxlength="9"
                  :mask="phoneMask"
                  v-model="primaryPhone.PhoneNumber"
                  label="Phone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  :rules="emailRules"
                  v-model="primaryEmail.Uri"
                  label="Email*"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.Street1" label="Street 1" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.Street2" label="Street 2"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.City" label="City"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-autocomplete
                  ref="stateCodeId"
                  :items="state"
                  label="State"
                  :value="accountState.Id"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.PostalCode" label="Zip Code" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-autocomplete :items="country" label="Country" :value="accountCountry.Id"></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="openAccountProfile = false">Close</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="onSave_Click"
            :loading="user_save"
            :disabled="user_save"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { accountApi } from "@/custom_modules/PathData";
import { api } from "@/custom_modules/PathApi";
import { autoSelect } from "@/statics/pathConstants";
export default {
  name: "account-info",
  data() {
    return {
      phoneMask: "(###)-###-####",
      emailRules: [v => /.+@.+/.test(v) || "Invalid Email address"],
      dataList: [],
      dataProgress: 0,
      accountLoading: false,
      imgLoadingHeight: 0,
      openAccountProfile: false,
      user_save: false,
      state: autoSelect.state,
      country: autoSelect.country
    };
  },
  computed: {
    primaryPhone: {
      get() {
        let self = this;
        return self.getAccountPhoneOrDefault();
      }
    },
    primaryAddress: {
      get() {
        let self = this;
        return self.getAccountAddressOrDefault();
      }
    },
    primaryEmail: {
      get() {
        let self = this;
        return self.getEmailOrDefault();
      }
    },
    accountState: {
      get() {
        let self = this;
        return self.getAccountStateOrDefault();
      }
    },
    accountCountry: {
      get() {
        let self = this;
        return self.getAccountCountryOrDefault();
      }
    },
    accountId: {
      get() {
        let self = this;
        return self.$store.getters.accountId;
      }
    },
    account: {
      get() {
        let self = this,
          hasAccount = self.dataList.length > 0;

        return !hasAccount ? {} : self.dataList[0];
      }
    }
  },
  methods: {
    open() {
      let self = this;
      self.loadData();
    },
    loadData() {
      let self = this;
      self.gridLoading = true;
      self.openAccountProfile = true;
      self.imgLoadingHeight = 2;

      accountApi
        .cacheFirst(self, null, self.accountId)
        .catch(err => {
          console.error("account vue", err);
        })
        .finally(function() {
          self.dataProgress = 100;
          if (self.dataList.length > 0) {
            self.account = self.dataList[0];
          }
          setTimeout(() => {
            self.gridLoading = false;
            self.dataProgress = 0;
            self.imgLoadingHeight = 0;
          }, 1000);
        });
    },
    onSave_Click() {
      let self = this,
        userId = self.$store.getters.userId,
        patApi = new api(self.$store.getters.baseUrl, self.accountId),
        fd = self._accountFormData(self.accountId, userId);

      self.user_save = true;

      patApi
        .updateEntity(fd, "account")
        .then(result => {
          if (!result && result.status !== 200) throw new error("error");

          pathVue.$pathComponents.Snack("Update Successful!");
          self.openAccountProfile = false;
        })
        .catch(err => {
          pathVue.$pathComponents.Snack("Update Failed!");
        })
        .finally(() => {
          self.user_save = false;
        });
    },
    getEmailOrDefault() {
      let self = this,
        hasEmail = self.account && self.account.PrimaryEmail;

      return !hasEmail ? "" : self.account.PrimaryEmail;
    },
    getAccountAddressOrDefault() {
      let self = this,
        noAddressInfo = !self.account || !self.account.PrimaryAddress;
      //if no address is found return an empty object to stop
      //null ref exception during bindings above :)
      return noAddressInfo ? {} : self.account.PrimaryAddress;
    },
    getAccountStateOrDefault() {
      let self = this,
        noStateInfo =
          !self.account ||
          !self.account.PrimaryAddress ||
          !self.account.PrimaryAddress.StateProvince;

      return noStateInfo ? {} : self.account.PrimaryAddress.StateProvince;
    },
    getAccountCountryOrDefault() {
      let self = this,
        noCountryInfo =
          !self.account ||
          !self.account.PrimaryAddress ||
          !self.account.PrimaryAddress.Country;

      return noCountryInfo ? {} : self.account.PrimaryAddress.Country;
    },
    getAccountPhoneOrDefault() {
      let self = this,
        hasPhone = self.account && self.account.PrimaryPhone;

      return !hasPhone ? {} : self.account.PrimaryPhone;
    },
    _accountFormData(accountId, userId) {
      let self = this,
        fd = new FormData();

      fd.append("objid", accountId);
      fd.append("accountId", accountId);
      fd.append("personId", userId);
      fd.append("firstName", self.account.FirstName);
      fd.append("middleName", self.account.MiddleName);
      fd.append("lastName", self.account.LastName);
      fd.append("primaryEmail", self.primaryEmail.Uri);
      fd.append("primaryPhone", self.primaryPhone.PhoneNumber);
      fd.append("street1", self.primaryAddress.Street1);
      fd.append("street2", self.primaryAddress.Street2);
      fd.append("city", self.primaryAddress.City);
      fd.append("stateProvinceId", self.$refs.stateCodeId.value);
      fd.append("countryId", "ffa4e908-d62d-4851-9952-5e4d239aa403");
      fd.append("postalCode", self.primaryAddress.PostalCode);

      return fd;
    }
  }
};
</script>

<style>
</style>
