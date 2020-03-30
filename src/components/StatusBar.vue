<template>
  <div>
    <div>
      <avatar
        v-for="(items, i) in socket.message"
        :key="i"
        :status="items.data.status"
        :name="items.data.user.user_metadata.full_name"
      />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import store from "@/store";
import { mapState } from "vuex";
import VueNativeSock from "vue-native-websocket";
import Avatar from "@/components/Avatar";

export default {
  name: "home",
  components: { Avatar },
  data() {
    return {
      response: null,
      userData: null,
      updatePayload: {
        userId: null,
        status: null
      }
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"], ["socket"]),
    socket() {
      return store.state.socket;
    }
  },
  mounted() {
    axios
      .get("http://localhost:9000/.netlify/functions/read-all-users")
      .then(response => {
        this.userData = response.data;
        this.getUserID();
      });
  },
  methods: {
    establishConnection() {},
    getUserID() {
      let user = this.userData.filter(obj => {
        return obj.data.user.id == this.currentUser.id;
      });
      this.updatePayload.status = user[0].data.status;
      this.updatePayload.userId = user[0].ref["@ref"].id;
      Vue.use(
        VueNativeSock,
        `ws://localhost:3000/?uuid=${this.updatePayload.userId}`,
        { format: "json", store: store }
      );
    }
  }
};
</script>
