<template>
  <div>
    <b-row class="ml-2 mr-2 ml-lg-5 mr-lg-5">
      <b-col
        cols="5"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        NAZWA PIWA
      </b-col>
      <b-col
        cols="3"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        ILOŚĆ
      </b-col>
      <b-col
        cols="2"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        W ML
      </b-col>
      <b-col
        cols="2"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        % ALC
      </b-col>
    </b-row>
    <div v-for="beer in beerTable" :key="beer.name">
      <b-row class="ml-2 mr-2 ml-lg-5 mr-lg-5 singleItem">
        <b-col
          cols="5"
          class="d-flex justify-content-center align-items-center beerItem"
        >
          {{ beer.name }}
        </b-col>
        <b-col
          cols="3"
          class="d-flex justify-content-center align-items-center beerItem"
        >
          {{ beer.drank }}
        </b-col>
        <b-col
          cols="2"
          class="d-flex justify-content-center align-items-center beerItem"
        >
          {{ beer.volume }}
        </b-col>
        <b-col
          cols="2"
          class="d-flex justify-content-center align-items-center beerItem"
        >
          {{ beer.alcVol }}
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beerTable"],
  methods: {
    renderbeerStats: function (val) {
      this.$store.commit("CHANGE_CHOSEN", val);
      this.$store.commit("CHANGE_COMPONENT", "beerStats");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>