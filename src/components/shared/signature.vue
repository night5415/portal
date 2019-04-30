<template>
  <div>
    <v-dialog v-model="dialog" height="500px" max-width="50vw">
      <v-card>
        <v-card-title>
          <span>{{title}}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text style="height:50vh; width:50vw; background-color:lightgray;">
          <VueSignaturePad id="signature" width="100%" height="100%" v-bind:ref="referenceId"/>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" v-on:click="undo">Undo</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-on:click="save">Save</v-btn>
          <v-btn color="primary" flat @click="dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="primary" dark @click="dialog = true">Get {{title}}</v-btn>
  </div>
</template>

<script>
export default {
  name: "signature",
  props: ["title", "referenceId"],
  mounted: function() {
    let self = this;
    self.$refs[self.referenceId].resizeCanvas();
  },
  data() {
    return {
      dialog: false,
      value: null
    };
  },
  methods: {
    undo() {
      let self = this;
      self.$refs[self.referenceId].resizeCanvas();
      self.$refs[self.referenceId].undoSignature();
    },
    save() {
      let self = this;
      const { isEmpty, data } = self.$refs[self.referenceId].saveSignature();
      self.value = data;
      self.dialog = false;
    },
    getSignatureData() {
      let self = this;
      return self.value;
    }
  }
};
</script>

<style>
</style>
