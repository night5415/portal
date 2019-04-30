<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex flex sm8 md6 lg4>
        <portal-authenticate/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  }
};
</script>

<style>
</style>
