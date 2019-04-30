<template>
  <v-data-table :headers="headers" :items="dataList" :loading="gridLoading">
    <v-progress-linear slot="progress" height="3" v-model="dataProgress"></v-progress-linear>
    <template v-slot:items="props">
      <td>{{ props.item.StartDate }}</td>
      <td>{{ props.item.ParticipantFirstName }} {{ props.item.ParticipantLastName }}</td>
      <td>{{ props.item.ObserverName }}</td>
      <td>{{ props.item.File }}</td>
    </template>
  </v-data-table>
</template> 
<script>
import { sessionApi } from "@/custom_modules/PathData";
export default {
  name: "session",
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
      gridLoading: false,
      headers: [
        { text: "Session Date", value: "StartDate" },
        { text: "Patient", value: "ParticipantFirstName" },
        { text: "Observer", value: "ObserverName" },
        { text: "File", value: "File" }
      ]
    };
  },
  methods: {
    loadData() {
      let self = this;
      self.gridLoading = true;
      sessionApi
        .cacheFirst(self)
        .catch(err => {
          console.log("session vue", err);
        })
        .finally(function() {
          self.dataProgress = 100;
          setTimeout(() => {
            self.gridLoading = false;
            self.dataProgress = 0;
          }, 1000);
        });
    }
  }
};
</script>

<style>
</style>
