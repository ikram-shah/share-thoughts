<template>
  <div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
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
                      required
                      v-model="loginCreds.email"
                      type="email"
                      name="email"
                      autofocus="autofocus"
                      class="input"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control is-clearfix">
                    <input
                      required
                      v-model="loginCreds.password"
                      type="password"
                      name="password"
                      autofocus="autofocus"
                      class="input"
                    />
                  </div>
                  <div class="control">
                    <b-button
                      disabled
                      class="astext"
                      type="is-text"
                      size="is-small"
                      >Forgot Password?</b-button
                    >
                  </div>
                </div>
                <br />
                <div class="columns is-mobile">
                  <b-field class="column" grouped>
                    <p class="control">
                      <b-button @click="$router.push('signup')"
                        >Sign Up</b-button
                      >
                    </p>
                  </b-field>
                  <b-field grouped class="column" position="is-right">
                    <p class="control">
                      <b-button @click="signIn" class="is-primary"
                        >Sign In</b-button
                      >
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
import EventBus from "@/eventBus";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["currentUser"])
  },
  data() {
    return {
      auth: null,
      isLogin: true,
      isLoading: false,
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
    openLoading() {
      this.isLoading = true;
    },
    closeLoading() {
      this.isLoading = false;
    },
    signIn() {
      if (this.validateFields()) {
        this.openLoading();
        let token = decodeURIComponent(window.location.search)
          .substring(1)
          .split("confirmation_token=")[1];
        this.attemptLogin({ token, ...this.loginCreds })
          .then(() => {
            this.closeLoading();
            this.handleSuccessfulLogin();
          })
          .catch(err => {
            this.closeLoading();
            this.handleUnsuccessfulLogin(err);
          });
      }
    },
    handleSuccessfulLogin() {
      this.transferToDashboard();
      this.updateStatus();
    },
    handleUnsuccessfulLogin(err) {
      this.$buefy.toast.open({
        message: `Error: ${err.error_description}`,
        type: "is-danger"
      });
    },
    validateFields() {
      if (
        this.loginCreds.email == null ||
        this.loginCreds.email == "" ||
        this.loginCreds.password == null ||
        this.loginCreds.password == ""
      ) {
        this.$buefy.toast.open({
          message: `Error: Invalid entry for email (or) password`,
          type: "is-danger"
        });
      } else {
        return true;
      }
    },
    transferToDashboard() {
      this.$router.push(this.$route.query.redirect || "/home");
    },
    updateStatus() {
      EventBus.$emit("updateStatusToOnline");
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
