<template>
  <div>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">Rejestracja</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <input type="text" name="login" placeholder="Login" class="formInput" />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <input
          type="password"
          name="pass"
          placeholder="Password"
          class="formInput"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <!-- <button
          @click="register()"
          class="btn btn-outline-success my-2 my-sm-0 bigButtonForDrunkPeople"
        >
          ZAREJESTRUJ SIĘ
        </button> -->
        <button
          @click="register()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople"
        >
          ZAREJESTRUJ SIE
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="changeToLogin()"
          class="btn btn-sm animated-button mainButton bitSmallerButtonForDrunkPeople"
        >
          CHCE SIE ZALOGOWAC
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  methods: {
    register: function () {
      let login = document.querySelector("input[type=text][name=login").value;
      let password = document.querySelector("input[type=password][name=pass")
        .value;
      console.log(`login: ${login}, password: ${password}`);
      let dane = {
        name: login,
        password: password,
      };
      this.$store.dispatch("register", dane);
    },
    changeToLogin: function () {
      this.$store.commit("CHANGE_COMPONENT", "Login");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>