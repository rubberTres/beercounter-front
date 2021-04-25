<template>
  <div>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">Logowanie</p>
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
        <button
          @click="login()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          ZALOGUJ SIE
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="changeToRegister()"
          class="btn btn-sm animated-button mainButton bitSmallerButtonForDrunkPeople rounded-0"
        >
          ZAREJESTRUJ SIE
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  methods: {
    login: function () {
      let login = document.querySelector("input[type=text][name=login").value;
      let password = document.querySelector("input[type=password][name=pass")
        .value;
      console.log(`login: ${login}, password: ${password}`);
      let dane = {
        name: login,
        password: password,
      };
      this.$store.dispatch("login", dane);
    },
    changeToRegister: function () {
      this.$store.commit("CHANGE_COMPONENT", "Register");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>