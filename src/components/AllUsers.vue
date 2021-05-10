<template>
  <div>
    <navbar></navbar>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">WSZYSCY UZYTKOWNICY</p>
      </b-col>
    </b-row>
    <rank-table
      :userTable="this.$store.state.userRankingAll"
      :users="true"
    ></rank-table>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="getTop()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          TOP 5
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="renderPosts()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          POSTY
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import RankTable from "./RankTable.vue";
export default {
  methods: {
    getTop: function () {
      this.$store.commit("CHANGE_COMPONENT", "Main");
    },
    renderPosts: function () {
      this.$store.commit("CHANGE_COMPONENT", "Posts");
    },
  },
  components: { RankTable, Navbar },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getBeerList");
    this.$store.dispatch("getUserRanking");
  },
};
</script>

<style lang="sass" scoped>
</style>