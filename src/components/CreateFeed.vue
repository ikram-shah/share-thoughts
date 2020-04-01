<template>
  <div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div class="container addFeedContainer">
      <b-input
        class="is-mobile"
        rows="2"
        expanded
        size="is-medium"
        placeholder="Any thoughts?"
        v-model="feed"
        maxlength="140"
        type="textarea"
      ></b-input>
      <div class="feedLinkContainer">
        <b-button type="is-primary" @click="postFeed()">Share</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/eventBus";
import { mapState } from "vuex";
export default {
  data() {
    return {
      feed: "",
      isLoading: false
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"])
  },
  methods: {
    openLoading() {
      this.isLoading = true;
    },
    closeLoading() {
      this.isLoading = false;
    },
    postFeed() {
      let here = this;
      here.openLoading();
      fetch(`http://localhost:9000/.netlify/functions/create-feed`, {
        method: "POST",
        body: JSON.stringify({
          body: this.feed,
          date: new Date(),
          author: this.currentUser.user_metadata.full_name
        })
      })
        .then(function(res) {
          return res.json();
        })
        .then(function() {
          here.closeLoading();
          here.$buefy.toast.open({
            message: `Added feed successfully.`,
            type: "is-primary"
          });
          EventBus.$emit("refreshFeedData");
        })
        .catch(err => {
          this.closeLoading();
          this.$buefy.toast.open({
            message: `Error: ${err}`,
            type: "is-danger"
          });
        });
    }
  }
};
</script>

<style>
.addFeedContainer {
  max-width: 70%;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.addFeedContainer textarea {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  outline: 0px;
  padding: 10px 20px;
}
.feedLinkContainer {
  text-align: right;
}
</style>
