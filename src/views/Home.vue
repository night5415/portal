<template>
  <main>
    <v-container fill-height fluid grid-list-xl>
      <v-layout wrap>
        <v-flex sm12 md6 lg6>
          <portal-card>
            <portal-participant/>
          </portal-card>
        </v-flex>
        <v-flex sm12 md6 lg6>
          <portal-calendar/>
        </v-flex>
        <v-flex sm12 md6 lg6>
          <portal-card>
            <portal-skill/>
          </portal-card>
        </v-flex>
        <v-flex sm12 md6 lg6>
          <portal-card>
            <portal-session/>
          </portal-card>
        </v-flex>
        <v-flex md12 lg12>
          <portal-card>
            <portal-invoice/>
          </portal-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "home",
  beforeMount() {},
  mounted() {
    let me = this;
    me.getPortalData();
  },
  beforeCreate() {},
  beforeDestroy() {},
  destroyed() {},
  data() {
    return {
      body:
        "Welcome to the Patient Portal, build with Vue.js, Vuitify and Love :)",
      title: "Welcome Home"
    };
  },
  methods: {
    getPortalData() {}
  },
  filters: {
    fnName: function(value) {
      return value;
    }
  }
};
</script>

<style scope>
main {
  margin-top: 35px;
}
</style>
