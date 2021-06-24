<template>
  <div id="app">
    <!-- <b-container fluid id="mainBox">
      <transition name="fade" mode="out-in">
        <component :is="this.$store.state.currentComponent" />
      </transition>
    </b-container> -->
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">2 SEZON</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <a href="https://piwo.life"><p class="header">PRZEJDŹ NA STRONE</p></a>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <img
          width="400"
          height="400"
          src="https://media.tenor.com/images/63702c664408ec4242015c2105558593/tenor.gif"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import Login from "./components/Login.vue";
// import Register from "./components/Register.vue";
// import Main from "./components/Main.vue";
// import AddPost from "./components/AddPost.vue";
// import UserStats from "./components/UserStats.vue";
// import BeerStats from "./components/BeerStats.vue";
// import Posts from "./components/Posts.vue";
// import AllUsers from "./components/AllUsers.vue";
// import BeerRanking from "./components/BeerRanking.vue";

export default {
  name: "App",
  // components: {
  //   Login,
  //   Register,
  //   Main,
  //   AddPost,
  //   UserStats,
  //   Posts,
  //   AllUsers,
  //   BeerRanking,
  //   BeerStats,
  // },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  /* transition: all 0.25s ease-in-out; */
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
