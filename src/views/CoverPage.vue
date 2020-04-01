<template>
  <section class="hero container is-medium is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">SHARE THOUGHTS</h1>
        <div class="buttons">
          <b-button @click="$router.push('/signin')"> Sign in </b-button>
          <b-button @click="$router.push('/signup')"> Sign up </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  beforeMount(){
    if (this.currentUser!=null){
      this.$router.push('/home')
    }
  },
   computed: {
    ...mapState("auth", ["currentUser"], ["socket"]),
   }
}
</script>
