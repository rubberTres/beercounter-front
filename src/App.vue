<template>
  <div id="app">
    <b-container fluid id="mainBox">
      <transition name="fade" mode="out-in">
        <component :is="this.$store.state.currentComponent" />
      </transition>
    </b-container>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
export default {
  name: "App",
  components: { Login, Register },
};
</script>

<style>
</style>
