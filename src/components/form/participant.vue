<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="openParticipantProfile"
      persistent
      max-width="600px"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Participant Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="person.FirstName" label="First name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="person.MiddleName" label="Middle name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="person.LastName" label="Last name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="person.DOB"
                      label="Picker without buttons"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="person.DOB" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="gender" label="Gender*" required></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="ethnicity" label="Ethnicity"></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="race" label="Race"></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="language" label="language"></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="openParticipantProfile = false">Close</v-btn>
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
import { autoSelect } from "@/statics/pathConstants";
import { api } from "@/custom_modules/PathApi";
export default {
  name: "participant-info",
  props: ["person"],
  data() {
    return {
      openParticipantProfile: false,
      menu: false,
      menu2: false,
      gender: autoSelect.gender,
      race: autoSelect.race,
      ethnicity: autoSelect.ethnicity,
      language: autoSelect.language,
      user_save: false
    };
  },
  mounted() {},
  methods: {
    open() {
      this.$data.openParticipantProfile = true;
    },
    onSave_Click() {
      let self = this,
        patApi = new api(pathVue.$store.getters.baseUrl, self.person.Id);

      self.user_save = true;

      patApi
        .updateEntity(self.person, "participant")
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
    }
  }
};
</script>

<style>
</style>
