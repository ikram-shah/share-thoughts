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
                  <label class="label">Name</label>
                  <div class="control is-clearfix">
                    <input
                      v-model="signupCreds.username"
                      type="text"
                      name="name"
                      required="required"
                      autofocus="autofocus"
                      class="input"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control is-clearfix">
                    <input
                      v-model="signupCreds.email"
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
                      v-model="signupCreds.password"
                      type="password"
                      name="password"
                      required="required"
                      autofocus="autofocus"
                      class="input"
                    />
                  </div>
                </div>
                <br />
                <div class="columns is-mobile">
                  <b-field class="column" grouped>
                    <p class="control">
                      <b-button @click="$router.push('signin')"
                        >Sign In</b-button
                      >
                    </p>
                  </b-field>
                  <b-field grouped class="column" position="is-right">
                    <p class="control">
                      <b-button @click="signUp" class="is-primary"
                        >Sign Up</b-button
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading: false,
      signupCreds: {
        username: null,
        email: null,
        password: null
      }
    };
  },
  mounted() {
    if (this.currentUser) {
      this.$buefy.toast.open({
        message: `Not able to signup when logged in.`,
        type: "is-warning"
      });
      this.$router.push("/home");
    }
  },
  computed: {
    ...mapState("auth", ["currentUser"])
  },
  methods: {
    ...mapActions("auth", ["attemptSignUp"]),
    openLoading() {
      this.isLoading = true;
    },
    closeLoading() {
      this.isLoading = false;
    },
    signUp() {
      if (this.validateFields()) {
        this.openLoading();
        this.attemptSignUp(this.signupCreds)
          .then(() => {
            this.closeLoading();
            this.$buefy.toast.open({
              message: `Your account has been created. Please login.`,
              type: "is-primary",
              duration: 5000
            });
            this.$router.push("signin");
          })
          .catch(err => {
            this.closeLoading();
            this.$buefy.toast.open({
              message: `Error: ${err}`,
              type: "is-danger"
            });
          });
      }
    },
    validateFields() {
      if (
        this.signupCreds.username == null ||
        this.signupCreds.username == "" ||
        this.signupCreds.email == null ||
        this.signupCreds.email == "" ||
        this.signupCreds.password == null ||
        this.signupCreds.password == ""
      ) {
        this.$buefy.toast.open({
          message: `Error: Invalid entry for username (or) email (or) password`,
          type: "is-danger"
        });
      } else {
        return true;
      }
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
