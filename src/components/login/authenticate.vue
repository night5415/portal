<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex flex sm8 md6 lg4>
        <v-card flat color="transparent">
          <form action>
            <v-text-field v-model="hostandusername" label="Host/UserName" required></v-text-field>
            <v-text-field v-model="password" :counter="10" label="Password" required></v-text-field>
          </form>
          <v-card-actions>
            <v-btn
              :loading="waiting"
              :disabled="waiting"
              v-on:click="onLogin_Click"
              flat
              color="blue"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template> 
<script>
export default {
  name: "authenticate",
  computed: {
    username: {
      get() {
        return this.$store.getters.userName;
      }
    },
    hostandusername: {
      get() {
        return this.$store.getters.hostAndUserName;
      },
      set(value) {
        this.$store.dispatch("updateUserName", value);
      }
    },
    password: {
      get() {
        return this.$store.getters.passWord;
      },
      set(value) {
        this.$store.dispatch("updatePassWord", value);
      }
    },
    pin: {
      get() {
        return this.$store.state.user.Pin;
      },
      set(value) {
        this.$store.dispatch("updatePin", value);
      }
    }
  },
  data() {
    return {
      waiting: false
    };
  },
  methods: {
    onLogin_Click() {
      var self = this;
      self.waiting = true;
      self.$pathUtil
        .generateKey(self.username, self.password)
        .then(key => {
          pathVue.$pathPouch.setEncryptionKey(key);
          return self.$store.dispatch("updateEncryptionKey", key);
        })
        .then(() => {
          self.$pathUtil
            .Login(self.username, self.password)
            .then(returnValue => {
              self.$store.dispatch("updateLogin", true);
              pathVue.$pathUtil.Navigate("/home");
              return self.$store.dispatch("updateUserId", returnValue.Id);
            })
            .catch(err => {
              let snackMessage = "Hmmmmm, something went wrong",
                response = err.response || { status: 500 };

              switch (response.status) {
                case 502:
                  snackMessage = "Bad Gateway";
                  break;
                case 401:
                  snackMessage = "Username or Password is incorrect";
                  break;
                case 500:
                  snackMessage =
                    "Looks like the server is down, please try again later";
                  break;
              }
              pathVue.$pathComponents.Snack(snackMessage);
            })
            .finally(function() {
              self.waiting = false;
            });
        });
    }
  }
};
</script>

<style scoped>
form {
  padding: 25px 20px;
  margin: 10px 0;
}
</style>
