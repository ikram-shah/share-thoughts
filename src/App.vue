<template>
  <div id="app">
    <div id="nav">
      <b-navbar v-if="currentUser">
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/home' }">HOME</b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-item tag="div">
            <StatusBar />
          </b-navbar-item>
          <b-navbar-item tag="div">
            <b-button type="is-dark" outlined @click="logout">Log out</b-button>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EventBus from "@/eventBus";
import StatusBar from "@/components/StatusBar";
export default {
  computed: {
    ...mapState("auth", ["currentUser"])
  },
  components: {
    StatusBar
  },
  methods: {
    ...mapActions("auth", ["attemptLogout"]),
    logout() {
      EventBus.$emit("updateStatusToOffline");
      this.attemptLogout()
        .then(() => {
          this.$router.push(this.$route.query.redirect || "/signin");
        })
        .catch(err =>
          this.$buefy.toast.open({
            message: `Error ${err}`,
            type: "is-danger"
          })
        );
    }
  }
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #ef5b25;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  font-family: Open-sans, sans-serif, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $primary;
    }
  }
}

html {
  background: #e2e1e13f;
}

.navbar {
  background: #e2e1e100;
}
</style>
