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
      this.$data.snackbar = true;
      this.$data.snackMessage = message;
    }
  }
};
</script>

<style>
</style>
