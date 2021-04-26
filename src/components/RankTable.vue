<template>
  <div>
    <b-row class="ml-2 mr-2 ml-lg-5 mr-lg-5">
      <b-col
        cols="2"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        NR
      </b-col>
      <b-col
        cols="4"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        IMIĘ
      </b-col>
      <b-col
        cols="3"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        WYPITE PIWSKA
      </b-col>
      <b-col
        cols="3"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        WYPITY ALKOHOL
      </b-col>
    </b-row>
    <div v-for="(user, i) in userTable" :key="user.name">
      <b-row
        class="ml-2 mr-2 ml-lg-5 mr-lg-5 singleItem"
        @click="renderUserStats(user.name)"
      >
        <b-col
          cols="2"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          {{ i + 1 }}
        </b-col>
        <b-col
          cols="4"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          {{ user.name }}
        </b-col>
        <b-col
          cols="3"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          {{ user.drank }}
        </b-col>
        <b-col
          cols="3"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          {{ user.alcVol }}
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userTable"],
  methods: {
    renderUserStats: function (val) {
      this.$store.commit("CHANGE_CHOSEN", val);
      this.$store.commit("CHANGE_COMPONENT", "UserStats");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>