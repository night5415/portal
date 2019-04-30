<template>
  <v-app :dark="darkTheme">
    <v-toolbar flat app dense>
      <v-toolbar-title>Patient Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :hidden="isLoggedIn">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="onAccountEdit_Click">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Account</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="onLogOut_Click">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="darkTheme"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dark</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <portal-confirm ref="pathConfirm"/>
    <portal-snack ref="pathSnack"/>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <v-avatar
      color="transparent"
      class="fixed-logo"
      @click="onLogo_Click"
      @dblclick="onLogo_DblClick"
    >
      <v-img src="/img/icons/apple-touch-icon-180x180.png" contain height="90"></v-img>
    </v-avatar>
    <portal-account-info ref="edit_account"/>
  </v-app>
</template> 
<script>
export default {
  name: "App",
  mounted() {
    let self = this;
    //these will
    window.addEventListener("online", self.updateOnlineStatus);
    window.addEventListener("offline", self.updateOnlineStatus);

    self.$root.$pathComponents = {
      Confirm: self.$refs.pathConfirm.open,
      Snack: self.$refs.pathSnack.showSnack
    };
    //set initial online status
    self.$store.dispatch("updateIsOnline", navigator.onLine);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.$store.dispatch("updateIsOnline", type === "online");
    },
    onLogOut_Click(self) {
      var self = this;
      pathVue.$pathComponents
        .Confirm({
          title: "Are you sure?",
          body: "Clicking yes will log you out!",
          accept: "Yes",
          decline: "No"
        })
        .then(e => {
          if (e) {
            self.$pathUtil.LogOut();
          }
        });
    },
    //TODO: this is only for testing!!!!!!
    onLogo_Click() {
      var self = this;
      self.$store.dispatch(
        "updateUserName",
        "test-lighthouse.abpathfinder.net/night5415"
      );
    },
    onLogo_DblClick() {
      var self = this;
      self.$store.dispatch("updateUserName", "localhost:9013/night5415");
    },
    onAccountEdit_Click() {
      let self = this;
      self.$refs.edit_account.open();
    }
  },
  data() {
    return {
      darkTheme: true
    };
  },
  computed: {
    isLoggedIn: {
      get() {
        return !this.$store.getters.isLoggedIn;
      }
    },
    darkTheme: {
      get() {
        var self = this;
        return self.$store.getters.Dark;
      }
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fixed-logo {
  position: fixed;
  bottom: 10px;
  left: 10px;
}
html {
  overflow: hidden;
}
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
</style>
