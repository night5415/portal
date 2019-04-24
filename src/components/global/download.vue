<template>
  <v-btn
    small
    :disabled="load"
    :loading="load"
    color="blue-grey"
    class="white--text"
    @click="download"
  >
    Download
    <v-icon right dark>cloud_download</v-icon>
  </v-btn>
</template>

<script>
import { debug } from "util";
export default {
  name: "download",
  props: {
    url: String,
    fileName: String,
    fileType: String
  },
  data() {
    return {
      load: false
    };
  },
  methods: {
    download() {
      let self = this;

      self.$data.load = true;
      pathVue.$pathUtil
        .downloadFile(
          self.$props.url,
          self.$props.fileName,
          self.$props.fileType
        )
        .catch(err => {
          console.error("downloader", err);
        })
        .finally(() => {
          self.$data.load = false;
        });
    }
  }
};
</script>

<style>
</style>
