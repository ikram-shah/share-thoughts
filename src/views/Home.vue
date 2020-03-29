<template>
  <div class="container">
    <button @click="senddata">Ikram</button>
    {{updatePayload}}
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
import Vue from "vue";
import axios from "axios";
import { mapState } from "vuex";
import VueNativeSock from 'vue-native-websocket'

export default {
  name: "home",
  data() {
    return {
      response: null,
      updatePayload: {
        userId: null,
        status: null
      }
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"])
  },
  mounted() {
    axios
      .get("http://localhost:9000/.netlify/functions/read-all-users")
      .then(response => {
        this.response = response.data;
        this.getUserID();
      });
  },
  methods: {
    getUserID() {
      let user = this.response.filter(obj => {
        return obj.data.user.id == this.currentUser.id;
      });
      this.updatePayload.userId = user[0].ref['@ref'].id
      Vue.use(VueNativeSock, `ws://localhost:3000/?uuid=${this.updatePayload.userId}`, { format: 'json' })
    },
    senddata() {
      Vue.prototype.$socket.send(JSON.stringify(this.updatePayload));
    }
  }
};
</script>
