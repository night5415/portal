<template>
  <v-data-table :headers="headers" :items="dataList" :loading="gridLoading">
    <v-progress-linear slot="progress" height="3" v-model="dataProgress"></v-progress-linear>
    <template v-slot:items="props">
      <td>{{ props.item.SkillTitle }}</td>
      <td>{{ props.item.LastCalcDate }}</td>
      <td>Dunno</td>
    </template>
  </v-data-table>
</template> 

<script>
import { skillApi } from "@/custom_modules/PathData";
export default {
  name: "skill",
  mounted() {
    let self = this,
      list = self.$data.dataList;
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
        { text: "Skill Name", value: "SkillTitle" },
        { text: "Date", value: "LastCalcDate" },
        { text: "Action", value: "ObserverName" }
      ]
    };
  },
  methods: {
    loadData() {
      let self = this;
      self.$data.gridLoading = true;
      skillApi
        .cacheFirst(self)
        .catch(err => {
          console.log("session vue", err);
        })
        .finally(function() {
          self.$data.dataProgress = 100;
          setTimeout(() => {
            self.$data.gridLoading = false;
            self.$data.dataProgress = 0;
          }, 1000);
        });
    }
  }
};
</script>

<style>
</style>
