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
        :placeholder="inputPlaceHolder"
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
    ...mapState("auth", ["currentUser"]),
    inputPlaceHolder() {
      return `Hey ${this.currentUser.user_metadata.full_name}..! Any thoughts ??`;
    }
  },
  methods: {
    openLoading() {
      this.isLoading = true;
    },
    closeLoading() {
      this.isLoading = false;
    },
    validateFeed() {
      if (this.feed == "" || this.feed == null) {
        this.$buefy.toast.open({
          message: `Error: Empty feed cannot be added.`,
          type: "is-danger"
        });
      } else {
        return true;
      }
    },
    postFeed() {
      let here = this;
      if (here.validateFeed()) {
        here.openLoading();
        fetch(`${process.env.VUE_APP_API_URL}/create-feed`, {
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
            here.feed = "";
            here.$buefy.toast.open({
              message: `Added feed successfully.`,
              type: "is-primary"
            });
            EventBus.$emit("refreshFeedData");
          });
      }
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
