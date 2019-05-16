<template>
  <div class="signin-container">
    <h2 class="signin-container--title">Sign In</h2>
    <div v-if="errorMessage" class="error__message">{{errorMessage}}
      <button @click="errorMessage = null" class="error__message--btn"><img src="@/assets/img/closewhite.svg" alt="Close button"></button>
    </div>
    <form action="./index.html" class="signin-container--form" @submit.prevent="signIn">
      <input v-model="email" type="email" name="email" id="signemail" placeholder="Email">
      <input v-model="password" type="password" name="password" id="signpassword" placeholder="Password">
      <input type="submit" value="Sign In">
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email : '',
      password: '',
      errorMessage: null
    }
  },
  methods: {
    signIn () {
      this.errorMessage = null
      this.$store.dispatch('signInUser', { email: this.email, password: this.password })
        .then(response => this.$router.push({name: 'Home'}))
        .catch(error => {
          alert(error.response.data.error.message)
          this.errorMessage = error.response.data.error.message
        })
    }
  }
}
</script>

<style>

</style>
