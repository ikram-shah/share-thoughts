<template>
  <span>
    <b-tooltip :label="avatarLabel" type="is-dark" position="is-bottom">
      <div v-if="!showCount" class="avatar__icon" :style="backgroundColor">
        <div class="avatar__initials">{{ name[0] }}</div>
        <img class="avatar__image" :src="randomAvatar" />
        <div class="avatar__notifications" :style="statusColor" />
      </div>
    </b-tooltip>
    <b-tooltip
      size="is-small"
      :label="toolTip"
      type="is-dark"
      multilined
      animated
      position="is-bottom"
    >
      <div v-if="showCount" class="avatar__icon" :style="backgroundColor">
        <div class="avatar__initials">{{ name }}</div>
      </div>
    </b-tooltip>
  </span>
</template>

<script>
export default {
  props: ["status", "name", "showCount", "toolTip"],
  computed: {
    randomAvatar() {
      let num = Math.floor(Math.random() * 15) + 1;
      return require(`../assets/avatars/${num}.png`);
    },
    avatarLabel() {
      return `${this.name} (${this.status}) `;
    },
    backgroundColor() {
      var hue = Math.floor(Math.random() * 360);
      var pastel = "hsl(" + hue + ", 100%, 90%)";
      return "background: " + pastel;
    },
    statusColor() {
      if (this.status === "online") {
        return "background: green";
      } else if (this.status === "offline") {
        return "background: red";
      } else {
        return "background: orange";
      }
    }
  },

  data() {
    return {
      selectedImage: null
    };
  }
};
</script>

<style scoped>
body {
  font-family: "Open Sans", sans-serif;
  color: #222;
  background: Gainsboro;
}
/* AVATAR NOTIFICATIONS*/
.avatar {
  position: relative;
  margin: 2rem;
}
.avatar a {
  text-decoration: none;
  color: #222;
  display: flex;
  align-items: center;
}
.avatar__icon {
  position: relative;
  display: inline-table;
  height: 2.2em;
  width: 2.2em;
  /* background: IndianRed; */
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 0 10px Grey;
  transform: scale(1);
  transition: transform 0.2s cubic-bezier(0.51, 0.92, 0.24, 1);
}
.avatar__icon--big {
  height: calc(2.2em * 3);
  width: calc(2.2em * 3);
}
.avatar__icon--big .avatar__initials {
  font-size: 2.2em;
}
.avatar__icon--big .avatar__notifications {
  bottom: 0;
  right: 0;
  font-size: 10px;
  min-width: 20px;
  min-height: 20px;
  line-height: 20px;
}
.avatar__icon:hover {
  transform: scale(1.1);
}
.avatar__notifications {
  width: 10%;
  position: absolute;
  bottom: -2px;
  right: -2px;
  /* background: Crimson; */
  border-radius: 50%;
  color: white;
  font-size: calc(10px / 2);
  min-width: 15px;
  min-height: 15px;
  line-height: 15px;
}
.avatar__image {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
  /* border: 2px solid IndianRed; */
  margin-bottom: 1rem;
  max-width: 100%;
  height: auto;
}
.avatar__initials {
  color: gray;
  display: table-cell;
  vertical-align: middle;
}
.avatar__name {
  margin-left: 1rem;
}
._abcd.b-tooltip:after {
  white-space: pre;
}

.b-tooltip.is-bottom.is-multiline.is-small:after {
  width: unset;
}

.navbar-item img {
  max-height: none;
  padding: 5px;
}
</style>
