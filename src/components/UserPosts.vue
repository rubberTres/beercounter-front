<template>
  <div>
    <div v-for="post in this.$store.state.posts" :key="post.imgLink">
      <b-row v-if="ifChosen(post.who)">
        <b-col class="d-flex justify-content-center align-items-center">
          <div class="projectBox" :class="{ niceWrap: descExists(post.desc) }">
            <b-row class="ml-2 mr-2 ml-lg-5 mr-lg-5 singleItem">
              <b-col
                md="5"
                class="d-flex justify-content-center align-items-center beerPost"
              >
                <img
                  :src="post.imgLink"
                  style="
                    height: 20vh;
                    max-height: 100%;
                    max-width: 100%;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                  "
                />
              </b-col>
              <b-col md="7" class="beerPost">
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p class="text-center">piwo: {{ post.beer }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p>alkohol: {{ beerVoltage(post.beer) }}%</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p>pojemność: {{ beerVolume(post.beer) }}ml</p>
                  </b-col>
                </b-row>
                <b-row v-if="descExists(post.desc)">
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center text-center cut2"
                  >
                    <p>opis: {{ post.desc }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p>{{ post.date }}</p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    beerVoltage(val) {
      for (let i = 0; i < this.$store.state.beerList.length; i++) {
        if (this.$store.state.beerList[i].beername == val)
          return this.$store.state.beerList[i].voltage;
      }
    },
    descExists(val) {
      return val != "brak opisu" && val != undefined;
    },
    beerVolume(val) {
      for (let i = 0; i < this.$store.state.beerList.length; i++) {
        if (this.$store.state.beerList[i].beername == val)
          return this.$store.state.beerList[i].volume;
      }
    },
    ifChosen(val) {
      return val == this.$store.state.chosenUser;
    },
  },
  components: {},
  mounted() {
    this.$store.dispatch("getBeerList");
  },
};
</script>

<style lang="sass" scoped>
.postBox
  width: 80vw
.projectBox
  height: 250px
  width: 80vw
  @media(max-width: 800px)
    height: 400px
</style>