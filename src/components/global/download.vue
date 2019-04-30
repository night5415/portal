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

      self.load = true;
      pathVue.$pathUtil
        .downloadFile(self.url, self.fileName, self.fileType)
        .catch(err => {
          console.error("downloader", err);
        })
        .finally(() => {
          self.load = false;
        });
    }
  }
};
</script>

<style>
</style>
