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
                <v-text-field v-model="primaryEmail" label="Email*" required></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.Street1" label="Street 1"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.Street2" label="Street 2" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.City" label="City"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="State" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="primaryAddress.PostalCode" label="Zip Code" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="account.LastName" label="Country" required></v-text-field>
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
export default {
  name: "account-info",
  data() {
    return {
      dataList: [],
      dataProgress: 0,
      gridLoading: false,
      account: {},
      openAccountProfile: false,
      user_save: false
    };
  },
  computed: {
    primaryAddress: {
      get() {
        let self = this;
        return self.getAccountAddressObjectOrDefault();
      }
    },
    primaryEmail: {
      get() {
        let self = this;
        return self.getEmailOrDefault();
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
      accountApi
        .networkOnly(self, null, "dfc540c2-61cf-41c1-9a1b-1493a1bbe428")
        .catch(err => {
          console.error("account vue", err);
        })
        .finally(function() {
          self.dataProgress = 100;
          self.openAccountProfile = true;
          if (self.dataList.length > 0) {
            self.account = self.dataList[0];
          }
          setTimeout(() => {
            self.gridLoading = false;
            self.dataProgress = 0;
          }, 1000);
        });
    },
    onSave_Click() {
      let self = this,
        patApi = new api(
          pathVue.$store.getters.baseUrl,
          "dfc540c2-61cf-41c1-9a1b-1493a1bbe428"
        ),
        fd = self.getAccountFormData();

      self.user_save = true;

      patApi
        .updateEntity({}, "account", fd)
        .then(result => {
          if (!result && result.status !== 200) throw new error("error");

          pathVue.$pathComponents.Snack("Update Successful!");
          self.openParticipantProfile = false;
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

      return !hasEmail ? "" : self.account.PrimaryEmail.Uri;
    },
    getAccountAddressObjectOrDefault() {
      let self = this,
        hasAddress = self.account && self.account.PrimaryAddress;

      return !hasAddress ? {} : self.account.PrimaryAddress;
    },
    getAccountFormData() {
      let self = this,
        fd = new FormData();

      fd.append("mode", "configuresecurity");
      fd.append("objid", "dfc540c2-61cf-41c1-9a1b-1493a1bbe428");
      fd.append(
        "authenticationMethodId",
        "15d8062b-4218-4a19-ae4b-5b5d0c5da74e"
      );
      fd.append("accountId", "dfc540c2-61cf-41c1-9a1b-1493a1bbe428");
      fd.append("isEmployeeInvited", "false");
      fd.append("createEmployee", "false");
      fd.append("personId", "0a493086-d705-4f38-8fb9-df8cc0240663");
      fd.append("userName", "night5415");
      fd.append("description", "");
      fd.append("firstName", "michael2");
      fd.append("middleName", "stephen");
      fd.append("lastName", "meloy");
      fd.append("primaryEmail", "meloymike@gmail.com");
      fd.append("primaryPhone", "8168106977");
      fd.append("street1", "3408 nw pink hill circle");
      fd.append("street2", "");
      fd.append("city", "blue springs");
      fd.append("stateProvinceId", "316d388d-7f76-4492-b64e-50d83643cc6a");
      fd.append("countryId", "ffa4e908-d62d-4851-9952-5e4d239aa403");
      fd.append("postalCode", "64015-9618");

      return fd;
    }
  }
};
</script>

<style>
</style>
