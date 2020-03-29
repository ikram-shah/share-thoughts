<template>
  <div class="container">
    <div class="column" v-for="(items,i) in response" :key="i">
      <h1>ID: {{items.ref['@ref'].id}}</h1>
      <h1>Netlify ID: {{items.data.user.id}}</h1>
      <h1>Email: {{items.data.user.email}}</h1>
      <h1>Name: {{items.data.user.user_metadata.full_name}}</h1>
      <h1>Status: {{items.data.status}}</h1>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      response: null
    };
  },
  mounted() {
    axios
      .get("http://localhost:9000/.netlify/functions/read-all-users")
      .then(response => {
        this.response = response.data;
      });
  }
};
</script>
