<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{body}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="decline">{{declineBtnText}}</v-btn>
        <v-btn color="primary" flat @click="accept">{{acceptBtnText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { button } from "@/statics/pathConstants";
export default {
  name: "confirm",
  mounted() {},
  data() {
    return {
      dialog: false,
      title: null,
      body: null,
      acceptBtnText: null,
      declineBtnText: null,
      resolve: null,
      reject: null
    };
  },
  methods: {
    open(options) {
      this.dialog = true;
      if (options) {
        this.title = options.title;
        this.body = options.body;
        this.acceptBtnText = options.accept || button.accept;
        this.declineBtnText = options.decline;
      } else {
        this.acceptBtnText = button.accept;
        this.declineBtnText = button.decline;
      }

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    accept() {
      this.resolve(true);
      this.dialog = false;
    },
    decline() {
      this.resolve(false);
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
