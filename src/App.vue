<template>
  <v-app :dark="darkTheme">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>Parent Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logOut" :hidden="notLoggedInYet">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
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
    logOut(self) {
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
    onLogo_Click() {
      var self = this;
      self.$store.dispatch(
        "updateUserName",
        "test-lighthouse.abpathfinder.net/night5415"
      );
    },
    onLogo_DblClick() {
      var self = this;
      //TODO: this is only for testing!!!!!!
      self.$store.dispatch("updateUserName", "localhost:9013/night5415");
    }
  },
  data() {
    return {};
  },
  computed: {
    notLoggedInYet: {
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
