<template>
  <div class="signup-container">
    <h2 class="signup-container--title">Sign Up</h2>
    <div v-if="errorMessage" class="error__message">{{errorMessage}}
      <button @click="errorMessage = null" class="error__message--btn"><img src="@/assets/img/closewhite.svg" alt="Close button"></button>
    </div>
    <form action="./index.html" class="signup-container--form" @submit.prevent="signUp">
      <input v-model="name" type="text" name="name" id="supname" placeholder="Name">
      <input v-model="email" type="email" name="email" id="supemail" placeholder="Email">
      <input v-model="password" type="password" name="password" id="suppassword" placeholder="Password">
      <input v-model="cpassword" type="password" name="repassword" id="suprepassword" placeholder="Confirm password">
      <input type="submit" value="Sign Up">
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      cpassword: '',
      name: '',
      errorMessage: null
    }
  },
  methods: {
    signUp () {
      this.errorMessage = null
      if(this.password == this.cpassword){
        this.$store.dispatch('registerUser', { name: this.name, email: this.email, password: this.password })
          .then(response => this.$router.push({name: 'Profile'}))
          .catch(err => this.errorMessage = err.response.data.error.message)
      } else {
        this.errorMessage = 'Passwords do not match. Please try again'
      }
    }
  }
}
</script>

<style>
  .signin-container--form__facebook{
    font-weight: 700;
  }
</style>
