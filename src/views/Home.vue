<template>
  <div>
    <createFeed />
    <br />
    <viewFeeds />
  </div>
</template>

<script>
import createFeed from "@/components/CreateFeed.vue";
import viewFeeds from "@/components/ViewFeeds.vue";
import { mapState } from "vuex";
export default {
  components: { createFeed, viewFeeds },
  computed: {
    ...mapState("auth", ["currentUser"])
  }
};
</script>
