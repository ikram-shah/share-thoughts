<template>
  <div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
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
  name: "StatusBar",
  components: { Avatar },
  data() {
    return {
      userData: null,
      isLoading: false,
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
    openLoading() {
      this.isLoading = true;
    },
    closeLoading() {
      this.isLoading = false;
    },
    readAllUsers() {
      this.openLoading();
      axios
        .get(`${process.env.VUE_APP_API_URL}/read-all-users`)
        .then(response => {
          this.closeLoading();
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
        `wss://sharethoughts-presense.herokuapp.com/?uuid=${this.updatePayload.userId}`,
        { format: "json", store: store }
      );
      return this.updatePayload.userId;
    },
    updateStatus(status, id) {
      fetch(`${process.env.VUE_APP_API_URL}/update-user/${id}`, {
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
