<template id="addTweet">
  <div class="container addTweetContainer">
    <b-input class="is-mobile" rows=2 expanded size="is-medium" placeholder="Any thoughts?" v-model="tweet" maxlength="140" type="textarea"></b-input>
    <div class="tweetLinkContainer">
       <b-button type="is-primary" @click="postTweet()"> Share </b-button>
    </div>
   
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      tweet: ""
    };
  },
  methods: {
    postTweet() {
      const tweet = {
        body: this.tweet,
        date: "now",
        author: "Me",
        avatar: "./images/egg.jpeg"
      };
      store.addtweetAction(tweet);
    }
  }
};
</script>

<style>
.addTweetContainer {
  max-width: 65%;
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