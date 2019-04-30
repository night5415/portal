<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{snackMessage}}
    <v-btn flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "snack",
  data() {
    return {
      snackbar: false,
      snackMessage: "",
      timeout: 3000
    };
  },
  methods: {
    showSnack(message) {
      var self = this;
      self.snackbar = true;
      self.snackMessage = message;
    }
  }
};
</script>

<style>
</style>
