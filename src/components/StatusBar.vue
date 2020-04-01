<template>
  <div>
    <div v-if="socket.message.length <= 5">
      <avatar
        v-for="(items, i) in socket.message"
        :key="i"
        :status="items.data.status"
        :name="items.data.user.user_metadata.full_name"
      />
    </div>
    <div v-else>
      <avatar
        v-for="(items, i) in socket.message.slice(0, userDisplayCount)"
        :key="i"
        :status="items.data.status"
        :name="items.data.user.user_metadata.full_name"
      />
      <avatar
        :showCount="true"
        :name="countToDisplay"
        :toolTip="toolTipUserStatus"
      />
    </div>
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
      userDisplayCount: 5,
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
    },
    countToDisplay() {
      return `+${this.socket.message.length - this.userDisplayCount}`;
    },
    toolTipUserStatus() {
      let response = "";
      this.socket.message
        .slice(this.userDisplayCount, this.socket.message.length)
        .forEach(item => {
          response += `${item.data.user.user_metadata.full_name}_(${item.data.status}) \n`;
        });
      return response;
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
          status: status,
          lastUpdated: new Date()
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
