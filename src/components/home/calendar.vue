<template>
  <v-layout>
    <v-flex>
      <v-toolbar>
        <v-flex sm4 xs12 class="text-sm-left text-xs-center">
          <v-btn flat @click="$refs.calendar.prev()">
            <v-icon left>keyboard_arrow_left</v-icon>Prev
          </v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        {{title}}
        <v-spacer></v-spacer>
        <!-- <v-flex sm4 xs12 class="text-xs-center">
          <v-select v-model="type" :items="typeOptions"></v-select>
        </v-flex>-->
        <v-flex sm4 xs12 class="text-sm-right text-xs-center">
          <v-btn flat @click="$refs.calendar.next()">
            Next
            <v-icon right>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-toolbar>
      <v-card height="500" elevation="6">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="primary"
          v-on:change="onCalendar_Change"
        ></v-calendar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { calendarApi } from "@/custom_modules/PathData";
export default {
  name: "calendar",
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
      recordCount: 0,
      title: new pathVue.$moment().format("MMMM"),
      type: "month",
      start: new Date(),
      end: "2019-01-06",
      typeOptions: [
        { text: "Day", value: "day" },
        { text: "Week", value: "week" },
        { text: "Month", value: "month" }
      ]
    };
  },
  methods: {
    onCalendar_Change(values) {
      var self = this;
      self.$data.title = new pathVue.$moment(values.start.date).format("MMMM");
      console.log(
        `calendar has changed from ${values.start.date} to ${values.end.date}`
      );
    },
    loadData() {
      let self = this;
      self.$data.gridLoading = true;
      calendarApi
        .cacheFirst(self)
        .then(results => {
          console.log(results);
        })
        .catch(err => {
          console.log("calendar vue", err);
        })
        .finally(function() {});
    }
  }
};
</script>

<style>
</style>
