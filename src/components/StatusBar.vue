<template>
  <div>
    <avatar
      v-for="(items, i) in socket.message"
      :key="i"
      :status="items.data.status"
      :name="items.data.user.user_metadata.full_name"
    />
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import store from "@/store";
import { mapState } from "vuex";
import EventBus from "@/eventBus";
import VueNativeSock from "vue-native-websocket";
import Avatar from "@/components/Avatar";

export default {
  name: "home",
  components: { Avatar },
  data() {
    return {
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
  beforeMount() {
    this.readAllUsers();
  },
  mounted() {
    EventBus.$once("updateStatusToOffline", () => {
      let id = this.getUserID();
      this.updateStatus("offline", id);
    });
  },
  methods: {
    readAllUsers() {
      axios
        .get("http://localhost:9000/.netlify/functions/read-all-users")
        .then(response => {
          this.userData = response.data;
          this.getUserID();
          this.updateStatus("online", this.updatePayload.userId);
        });
    },
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
      return this.updatePayload.userId;
    },
    updateStatus(status, id) {
      fetch(`http://localhost:9000/.netlify/functions/update-user/${id}`, {
        method: "POST",
        body: JSON.stringify({
          status: status
        })
      })
        .then(function(res) {
          return res.json();
        })
        .then(function() {});
    }
  }
};
</script>
