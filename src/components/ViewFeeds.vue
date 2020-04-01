<template>
  <div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
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
  </div>
</template>

<script>
import EventBus from "@/eventBus";
export default {
  data() {
    return {
      feed: null,
      isLoading: false
    };
  },
  mounted() {
    this.getFeeds();
    EventBus.$once("refreshFeedData", () => {
      this.getFeeds();
    });
  },
  methods: {
    openLoading() {
      this.isLoading = true;
    },
    closeLoading() {
      this.isLoading = false;
    },
    getFeeds() {
      let here = this;
      here.openLoading();
      fetch(`${process.env.VUE_APP_API_URL}/read-all-feeds`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          here.closeLoading();
          here.feed = data;
        })
        .catch(err => {
          here.closeLoading();
          here.$buefy.toast.open({
            message: `Error: ${err}`,
            type: "is-danger"
          });
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
