<template>
  <v-container grid-list-xl>
    <v-progress-linear :indeterminate="imgLoading" :height="imgLoadingHeight"></v-progress-linear>
    <v-layout>
      <v-flex>
        <v-hover>
          <v-card flat @click="profile_OnClick" slot-scope="{ hover }" ripple>
            <v-avatar :size="imgSize" tile>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="profile_OnChange"
              >
              <v-img
                max-width="300"
                min-width="125"
                v-if="profile"
                :src="profile.PublicUrl"
                :alt="profile.Description"
              ></v-img>
              <v-icon size="125" v-else>person</v-icon>
              <v-icon
                size="50"
                class="profile-hover"
                :style="`opacity:${hover ? .5 : 0}`"
              >image_search</v-icon>
            </v-avatar>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>{{person.FirstName}} {{person.LastName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="edit_OnClick">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-toolbar>
        <hr>
        <div class="data">
          <div>DOB:</div>
          <div>{{person.DOB | formatDate}}</div>
          <div>Case Number:</div>
          <div>{{person.CaseNumber | formatCaseNumber}}</div>
          <div>Address:</div>
          <div>
            {{person.Addresses | formatStreet}}
            <br>
            {{person.Addresses | formatCityStateZip}}
          </div>
          <div>Bank</div>
          <div>{{person.ParticipantBankBalance | formatCurrency}}</div>
        </div>
        <hr>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row fill-height>
      <v-flex>
        <v-data-table :headers="headers" :items="person.Documents">
          <template v-slot:items="props">
            <td>{{ props.item.Name}}</td>
            <td>{{ props.item.Description }}</td>
            <td>{{ props.item.CreationDate | formatDate }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <portal-participant-info ref="edit" v-bind:person="person" v-model="showDialog"/>
  </v-container>
</template>

<script>
import { api } from "@/custom_modules/PathApi";
import { entity } from "@/statics/pathConstants";
export default {
  name: "demographic",
  props: ["person"],
  data() {
    return {
      profile: null,
      imgLoading: false,
      imgLoadingHeight: 0,
      imgSize: "100%",
      showDialog: false,
      headers: [
        { text: "File", value: "Name" },
        { text: "Description", value: "Description" },
        { text: "Created", value: "CreationDate" }
      ]
    };
  },
  mounted() {
    let self = this,
      patApi = new api(pathVue.$store.getters.baseUrl, self.$props.person.Id);
    self.$data.imgLoading = true;
    self.$data.imgLoadingHeight = 2;
    patApi
      .participantImage()
      .then(result => {
        self.$data.profile = result;
      })
      .catch(err => {})
      .finally(function() {
        self.$data.imgLoading = false;
        self.$data.imgLoadingHeight = 0;
      });
  },
  methods: {
    edit_OnClick() {
      let self = this;
      self.$refs.edit.open();
    },
    profile_OnClick() {
      this.$refs.image.click();
    },
    profile_OnChange(e) {
      let self = this,
        file = e.target.files[0],
        reader = new FileReader(),
        linkType = "participant",
        currentImg = self.$data.profile,
        newImp,
        roleId = "7d11bd7b-2ea4-4344-942e-0add07866ab3"; //DocrolePatprofilepic

      if (file !== undefined && file.name.lastIndexOf(".") <= 0) return;

      self.imgLoading = true;
      self.imgLoadingHeight = 2;

      reader.readAsDataURL(file);
      reader.addEventListener("load", val => {
        new Promise(function(resolve, reject) {
          if (!currentImg) resolve();

          currentImg.IsSoftDeleted = true;
          new api(self.$store.getters.baseUrl, currentImg.Id)
            .updateEntity(currentImg, "document")
            .then(results => {
              resolve(results);
            })
            .catch(err => {
              reject(err);
            });
        })
          .then(results => {
            let azureApi = new api(
              self.$store.getters.baseUrl,
              self.$props.person.Id
            );
            return azureApi.saveToAzureStorage(file, linkType, roleId);
          })
          .then(result => {
            let newDocument = result.data.data[0];
            self.profile = {
              PublicUrl: val.target.result,
              LinkId: self.$props.person.Id,
              EntityId: entity.participant,
              Id: newDocument.documentId
            };
            pathVue.$pathComponents.Snack("Profile Image Updated");
          })
          .catch(err => {
            pathVue.$pathComponents.Snack("Profile Image Update Failed");
          })
          .finally(() => {
            self.imgLoading = false;
            self.imgLoadingHeight = 0;
          });
      });
    }
  },
  filters: {
    formatCaseNumber(caseNumber) {
      return !caseNumber ? "N/A" : caseNumber;
    },
    formatStreet(addressArray) {
      let primaryAddress = addressArray.find(a => {
        return a.IsPrimary;
      });
      return primaryAddress ? `${primaryAddress.Street1}` : "N/A";
    },
    formatCityStateZip(addressArray) {
      let p = addressArray.find(a => {
        return a.IsPrimary;
      });
      return p ? `${p.City}, ${p.StateProvince.Name} ${p.PostalCode}` : "";
    }
  }
};
</script>

<style scope>
.data {
  display: grid;
  grid-template-columns: 100px auto;
  grid-template-rows: auto;
  grid-gap: 1em;
  margin: 1em 0;
}
.profile-hover {
  position: absolute;
  background-color: #000;
  cursor: pointer;
}
</style>
