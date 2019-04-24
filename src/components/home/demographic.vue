<template>
  <v-container grid-list-xl>
    <v-layout>
      <portal-participant-info v-bind:person="person" v-bind:openParticipantProfile="showDialog"/>
      <v-flex>
        <v-hover>
          <v-card slot-scope="{ hover }" flat>
            <v-avatar :size="imgSize">
              <v-img v-if="avatar" :src="avatar" alt="Avatar">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="setting-hover"
                    transition="fade-transition"
                    @click="setting_OnClick"
                  >
                    <v-icon large>settings</v-icon>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-icon :size="imgSize" v-else>person</v-icon>
            </v-avatar>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex>
        <h3>{{person.FirstName}} {{person.LastName}}</h3>
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
      <v-data-table :headers="headers" :items="person.Documents">
        <template v-slot:items="props">
          <td>{{ props.item.Name}}</td>
          <td>{{ props.item.Description }}</td>
          <td>{{ props.item.CreationDate | formatDate }}</td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import { api } from "@/custom_modules/PathApi";
export default {
  name: "demographic",
  props: ["person"],
  data() {
    return {
      avatar: null,
      imgSize: 125,
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

    patApi
      .participantImage()
      .then(r => {
        self.$data.avatar = r;
      })
      .catch(err => {});
  },
  methods: {
    setting_OnClick() {
      let self = this;
      self.$data.showDialog = true;
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
.setting-hover {
  background-color: #000;
  opacity: 0.6;
  cursor: pointer;
  height: 100%;
}
</style>
