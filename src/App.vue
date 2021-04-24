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
.fade-enter-active,
.fade-leave-active {
  /* transition: opacity 0.25s ease-out; */
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
