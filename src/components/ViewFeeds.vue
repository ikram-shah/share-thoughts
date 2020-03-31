<template>
  <div class="container">
    <div v-for="item in feed" :key="item.name">
      <div class="card">
        <div class="card-content">
          <p class="title is-spaced">{{ item.data.body }}</p>
          <hr />
          <p class="subtitle">{{ item.data.author }}</p>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import EventBus from "@/eventBus";
export default {
  data() {
    return {
      feed: null
    };
  },
  mounted() {
    this.getFeeds();
    EventBus.$once("refreshFeedData", () => {
      this.getFeeds();
    });
  },
  methods: {
    getFeeds() {
      fetch("http://localhost:9000/.netlify/functions/read-all-feeds")
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.feed = data;
        });
    }
  }
};
</script>

<style>
.container {
  max-width: 70%;
  border-radius: 10px;
  text-align: left;
}

.title {
  font-size: x-large !important;
}

.card {
  border-radius: 5px;
}
</style>
