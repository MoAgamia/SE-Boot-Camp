<template>
  <section class="login-section">
    <h2 class="login-header">Sign In</h2>
    <form v-on:submit.prevent="login">
        <div class="login-field">
            <label for="username">Email</label>
            <input type="email" name="email" v-model="user.email" id="email">
        </div>
        <div class="login-field">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="user.password" id="password">
        </div>
        <button class="login-button">Login</button>
        <br/>
        <router-link to="/register">Signup</router-link>
        <p>{{msg}}</p>
    </form>
  </section>
</template>
<script>
import api from "../api/api.js";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      msg: ""
    };
  },
  methods: {
    login() {
      api
        .login(this.user)
        .then(res => {
          api.saveLoginToken(res.data.data);
          this.$router.push(this.$route.query.redirect);
        })
        .catch(err => {
          if (err.response) this.msg = err.response.data.msg;
          else console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.login-section {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  background: #f8f8f8;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 3% 0;
}

.login-section h2 {
  font-size: 50px;
}

.login-field {
  font-size: 20px;
  margin: 10% auto;
}

.login-field > input {
  height: 30px;
  color: #5c616f;
}

.login-button {
  background: none;
  border: none;
  font-size: 30px;
  color: #5c616f;
  cursor: pointer;
}
</style>
