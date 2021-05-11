<template>
  <b-navbar
    toggleable="sm"
    type="dark"
    variant="faded"
    class="border-bottom-light"
  >
    <b-navbar-toggle target="nav-collapse" class="ml-auto mr-auto border-0">
      <template #default="{ expanded }">
        <button class="buttonNav" v-if="expanded">SCHOWAJ</button>
        <button class="buttonNav" v-else>ROZWIŃ MENU</button>
      </template>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mr-auto fontMono">
        <b-nav-text @click="renderMain()" class="text-center yellowFont">
          {{ timeUntil }}
        </b-nav-text>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto fontMono">
        <b-nav-item @click="renderMain()" class="text-center">
          top 5
        </b-nav-item>
        <b-nav-item class="text-center" @click="renderAddPost()">
          zgłoś wypite
        </b-nav-item>
        <b-nav-item class="text-center" @click="allUsers()">
          użytkownicy
        </b-nav-item>
        <b-nav-item class="text-center" @click="yourStats()">
          twój profil
        </b-nav-item>
        <b-nav-item class="text-center" @click="beerRanking()">
          piwa
        </b-nav-item>
        <b-nav-item class="text-center" @click="renderPosts()">
          posty
        </b-nav-item>
        <b-nav-item class="text-center" @click="wyloguj()">
          wyloguj się
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data: () => {
    return {
      timeUntil: "zostało x do mazur",
      finishDate: new Date("Aug 14, 2021 08:00:00").getTime(),
    };
  },
  computed: {
    daysUntil: function () {
      // let dateOfTrip = new Date(2021, 7, 14);
      // dateOfTrip = Math.floor(
      //   (dateOfTrip - new Date(dateOfTrip.getFullYear(), 0, 0)) /
      //     1000 /
      //     60 /
      //     60 /
      //     24
      // );
      // let currentDate = new Date();
      // currentDate = Math.floor(
      //   (currentDate - new Date(currentDate.getFullYear(), 0, 0)) /
      //     1000 /
      //     60 /
      //     60 /
      //     24
      // );
      // if (dateOfTrip - currentDate > 0) {
      //   return `zostało ${dateOfTrip - currentDate} dni do mazur`;
      // } else return `mazury edition`;
      return "aa";
    },
  },
  methods: {
    wyloguj: function () {
      this.$store.dispatch("logout");
    },
    tripTimer: function () {
      let timer = setInterval(() => {
        let now = new Date().getTime();
        let distance = this.finishDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (days != 0)
          this.timeUntil = `zostało ${days}d ${hours}h ${minutes}min ${seconds}s do mazur`;
        else this.timeUntil = "mazury edition";
      }, 1000);
    },
    renderAddPost: function () {
      this.$store.commit("CHANGE_COMPONENT", "AddPost");
    },
    renderMain: function () {
      this.$store.commit("CHANGE_COMPONENT", "Main");
    },
    yourStats: function () {
      this.$store.commit("CHANGE_CHOSEN", this.$store.state.username);
      this.$store.commit("CHANGE_COMPONENT", "UserStats");
    },
    renderPosts: function () {
      this.$store.commit("CHANGE_COMPONENT", "Posts");
    },
    allUsers: function () {
      this.$store.commit("CHANGE_COMPONENT", "AllUsers");
    },
    beerRanking: function () {
      this.$store.commit("CHANGE_COMPONENT", "BeerRanking");
    },
  },
  mounted() {
    this.tripTimer();
  },
};
</script>

<style lang="sass" scoped>
</style>