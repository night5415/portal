<template>
  <v-layout row justify-center>
    <v-dialog v-model="openParticipantProfile" persistent max-width="600px">
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
                  ref="menu"
                  v-model="menu"
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
                      :value="computedDateFormat"
                      label="DOB"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="['Male', 'Female']" label="Gender"></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="['Male', 'Female']" label="Ethnicity"></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="['Male', 'Female']" label="Race"></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete :items="['Male', 'Female']" label="Language"></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="openParticipantProfile = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="openParticipantProfile = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "participant-info",
  props: ["person", "openParticipantProfile"],
  data() {
    return {
      menu: false
    };
  },
  mounted() {},
  methods: {
    computedDateFormat() {
      var self = this;
      debugger;
      return this.date
        ? pathVue.$moment(this.date).format("dddd, MMMM Do YYYY")
        : "";
    }
  }
};
</script>

<style>
</style>
