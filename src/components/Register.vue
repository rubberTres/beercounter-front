<template>
  <div>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <h1>REGISTER</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <input type="text" name="login" placeholder="login" />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <input type="password" name="pass" placeholder="password" />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <button
          @click="register()"
          class="btn btn-outline-success my-2 my-sm-0"
        >
          ZAREJESTRUJ SIĘ
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <button
          @click="changeToLogin()"
          class="btn btn-outline-success my-2 my-sm-0"
        >
          CHCĘ SIĘ ZALOGOWAĆ
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
      this.$store.dispatch("register", login, password);
    },
    changeToLogin: function () {
      this.$store.commit("CHANGE_COMPONENT", "Login");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>