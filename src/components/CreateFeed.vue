<template id="addTweet">
  <div class="container addTweetContainer">
    <b-input
      class="is-mobile"
      rows="2"
      expanded
      size="is-medium"
      placeholder="Any thoughts?"
      v-model="tweet"
      maxlength="140"
      type="textarea"
    ></b-input>
    <div class="tweetLinkContainer">
      <b-button type="is-primary" @click="postTweet()">Share</b-button>
    </div>
  </div>
</template>

<script>
import EventBus from '@/eventBus'
import { mapState } from "vuex";
export default {
  data() {
    return {
      tweet: ""
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"])
  },
  methods: {
    postTweet() {
      fetch(`http://localhost:9000/.netlify/functions/create-feed`, {
        method: "POST",
        body: JSON.stringify({
          body: this.tweet,
          date: new Date(),
          author: this.currentUser.user_metadata.full_name
        })
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          EventBus.$emit("refreshFeedData");
          console.log(JSON.stringify(data));
        });
    }
  }
};
</script>

<style>
.addTweetContainer {
  max-width: 70%;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.addTweetContainer textarea {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  outline: 0px;
  padding: 10px 20px;
}
.tweetLinkContainer {
  text-align: right;
}
</style>
