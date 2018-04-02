<template>
  <section class="registeration-section">
    <h2 class="registeration-header">Sign Up</h2>
    <form v-on:submit.prevent="registeration">
        <div class="registeration-field">
            <label for="username">Email</label>
            <input type="email" name="email" v-model="user.email" id="email">
        </div>
        <div class="registeration-field">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="user.password" id="password">
        </div>
        <div class="registeration-field">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" name="confirm-password" v-model="user.confirmPassword" id="confirm-password">
        </div>
        <button class="registeration-button">Register</button>
        <br/>
        <router-link to="/login">Signin</router-link>      
        <p>{{msg}}</p>  
    </form>
  </section>
</template>
<script>
import api from "../api/api.js";

export default {
  name: "registeration",
  data() {
    return {
      user: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      msg: ""
    };
  },
  methods: {
    registeration() {
      api.register(this.user)
        .then(res => {
          this.$router.push('/login');
        })
        .catch(err => (this.msg = err.response.data.msg));
    }
  }
};
</script>
<style scoped>
.registeration-section {
  width: 400px;
  height: 450px;
  margin: 0 auto;
  background: #f8f8f8;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 3% 0;
}

.registeration-section h2 {
  font-size: 50px;
}

.registeration-field {
  font-size: 20px;
  margin: 10% auto;
}

.registeration-field > input {
  height: 30px;
  color: #5c616f;
}

.registeration-button {
  background: none;
  border: none;
  font-size: 30px;
  color: #5c616f;
  cursor: pointer;
}
</style>
