<template>
  <div class="container card">
    <b-table :data="socket.message">
      <template slot-scope="props">
        <b-table-column field="status" label="Status">
          <span class="tag" :class="type(props.row.data.status)">
            {{ props.row.data.status.toUpperCase() }}
          </span>
        </b-table-column>
        <b-table-column field="name" label="Name">
          {{ props.row.data.user.user_metadata.full_name }}
        </b-table-column>
        <b-table-column field="email" label="Email">
          {{ props.row.data.user.email }}
        </b-table-column>
        <b-table-column field="Last Seen" label="Last Seen">
          <span
            v-if="props.row.data.status === 'online'"
            class="tag"
            :class="type(props.row.data.status)"
            >Now</span
          >

          <span v-else>
            {{ getDisplayDate(props.row.data.lastUpdated) }} @
            {{ getDisplayTime(props.row.data.lastUpdated) }}
          </span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
export default {
  computed: {
    ...mapState("auth", ["currentUser"], ["socket"]),
    socket() {
      return store.state.socket;
    }
  },
  methods: {
    type(value) {
      if (value === "offline") {
        return "is-light";
      } else if (value === "online") {
        return "is-primary";
      }
    },
    getDisplayDate(date) {
      let today = new Date();
      let compDate = new Date(date);
      let diff = today.getTime() - compDate.getTime();
      if (compDate.getDate() === today.getDate()) {
        return "Today";
      } else if (diff <= 24 * 60 * 60 * 1000) {
        return "Yesterday";
      } else {
        return (
          ("0" + (compDate.getDate())).slice(-2) +
          "-" +
          ("0" + (compDate.getMonth() + 1)).slice(-2) +
          "-" +
          compDate.getFullYear()
        );
      }
    },
    getDisplayTime(date) {
      date = new Date(date);
      const leadingZero = num => `0${num}`.slice(-2);
      const formatTime = [date.getHours(), date.getMinutes()]
        .map(leadingZero)
        .join(":");
      return formatTime;
    }
  }
};
</script>
