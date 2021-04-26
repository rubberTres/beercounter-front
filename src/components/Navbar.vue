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
      <b-navbar-nav class="ml-auto fontMono">
        <b-nav-item @click="renderMain()" class="text-center">
          top 5
        </b-nav-item>
        <b-nav-item class="text-center" @click="renderAddPost()">
          zgłoś wypite
        </b-nav-item>
        <b-nav-item class="text-center"> użytkownicy </b-nav-item>
        <b-nav-item class="text-center" @click="yourStats()">
          twój profil
        </b-nav-item>
        <b-nav-item class="text-center"> piwa </b-nav-item>
        <b-nav-item class="text-center"> posty </b-nav-item>
        <b-nav-item class="text-center" @click="wyloguj()">
          wyloguj się
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    wyloguj: function () {
      this.$store.dispatch("logout");
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
  },
};
</script>

<style lang="sass" scoped>
</style>