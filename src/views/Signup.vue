<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-fifths">
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
                <div class="columns">
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
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      signupCreds: {
        username: null,
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions("auth", ["attemptSignUp"]),
    signUp() {
      this.attemptSignUp(this.signupCreds)
        .then(() => {
          console.log("A confirmation email has been sent to you!");
        })
        .catch(err => console.log(err, "Something went wrong."));
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
