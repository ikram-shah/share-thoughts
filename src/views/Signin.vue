<template>
  <div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-fifths">
          <div class="card">
            <div class="card-content">
              <div class="is-title-bar" style="text-align:center">
                <h5 class="title is-4">SHARE THOUGHTS</h5>
              </div>
              <hr />
              <section>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control is-clearfix">
                    <input
                      v-model="loginCreds.email"
                      type="email"
                      name="email"
                      required="required"
                      autofocus="autofocus"
                      class="input"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control is-clearfix">
                    <input
                      v-model="loginCreds.password"
                      type="password"
                      name="password"
                      required="required"
                      autofocus="autofocus"
                      class="input"
                    />
                  </div>
                  <div class="control">
                    <b-button class="astext" type="is-text" size="is-small">Forgot Password?</b-button>
                  </div>
                </div>
                <br />
                <div class="columns is-mobile">
                  <b-field class="column" grouped>
                    <p class="control">
                      <b-button @click="$router.push('signup')">Sign Up</b-button>
                    </p>
                  </b-field>
                  <b-field grouped class="column" position="is-right">
                    <p class="control">
                      <b-button @click="signIn" class="is-primary">Sign In</b-button>
                    </p>
                  </b-field>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["currentUser"])
  },

  data() {
    return {
      auth: null,
      isLogin: true,
      loginCreds: {
        email: null,
        password: null
      }
    };
  },
  mounted() {
    if (this.currentUser) {
      this.$buefy.toast.open({
        message: `Not able to signin when logged in.`,
        type: "is-warning"
      });
      this.$router.push("/home");
    }
  },
  methods: {
    ...mapActions("auth", ["attemptLogin"]),
    signIn() {
      let token = decodeURIComponent(window.location.search)
        .substring(1)
        .split("confirmation_token=")[1];
      this.attemptLogin({ token, ...this.loginCreds })
        .then(() => {
          this.handleSuccessfulLogin();
        })
        .catch(err => {
          this.handleUnsuccessfulLogin(err);
        });
    },
    handleSuccessfulLogin() {
      this.transferToDashboard();
    },
    handleUnsuccessfulLogin(err) {
      this.$buefy.toast.open({
        message: `Error: ${err.message}`,
        type: "is-danger"
      });
    },
    transferToDashboard() {
      this.$router.push(this.$route.query.redirect || "/home");
    }
  }
};
</script>

<style scoped>
.card {
  border: 0.5px solid rgba(128, 128, 128, 0.493);
  border-radius: 10px;
}
.label {
  text-align: left;
}
.astext {
  background: none !important;
  padding: 0 !important;
}
</style>
