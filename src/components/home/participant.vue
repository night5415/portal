<template>
  <v-container fluid fill-height class="pa-0 ma-0">
    <v-layout>
      <v-flex>
        <v-tabs left slider-color="yellow">
          <v-tab v-for="person in dataList" :key="person.id" ripple>{{person.FirstName}}</v-tab>
          <v-tab>Messages</v-tab>
          <v-tab-item v-for="person in dataList" :key="person.id">
            <portal-demographic v-bind:person="person"/>
          </v-tab-item>
          <v-tab-item>
            <portal-participant-messages/>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { participantApi } from "@/custom_modules/PathData";
export default {
  name: "participant",
  mounted() {
    let self = this,
      list = self.dataList;
    if (list && list.length === 0) {
      self.loadData();
    }
  },
  data() {
    return {
      dataList: [],
      dataProgress: 0,
      recordCount: 0
    };
  },
  methods: {
    loadData() {
      let self = this;
      self.gridLoading = true;
      participantApi
        .cacheFirst(self)
        .then(results => {
          console.log(results);
        })
        .finally(function() {})
        .catch(err => {});
    }
  }
};
</script>

<style>
</style>
