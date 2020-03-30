<template>
  <div>
    <createFeed />
    <viewFeeds />
  </div>
</template>

<script>
import createFeed from "@/components/CreateFeed.vue";
import viewFeeds from "@/components/ViewFeeds.vue";
export default {
  components: { createFeed, viewFeeds }
};
</script>
