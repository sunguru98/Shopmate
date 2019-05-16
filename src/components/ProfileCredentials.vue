<template>
  <div class="profile__container--credentials">
    <div class="container__combined" style="display: flex; align-items: center">
      <h2 class="profile__container--title">Update Profile</h2>
      <div v-if="errorMessage" class="error__message" style="width: 50%; margin-left: 5rem">{{errorMessage}}
        <button @click="errorMessage = null" class="error__message--btn"><img src="@/assets/img/closewhite.svg" alt="Close button"></button>
      </div>
    </div>
    <form action="#" class="profile__container--credentialsform" @submit.prevent='updateUserCredentials'>
      <div class="form__leftside">
        <label for="name">Name</label>
        <input v-model="userName" type="text" name="customername" id="name" placeholder="Name" tabindex="1">
        <label for="password">Update Password</label>
        <input v-model="newPassword" type="password" name="customerpassword" id="password" placeholder="Password" tabindex="3">
      </div>
      <div class="form__rightside">
        <label for="email">Email</label>
        <input v-model="userEmail" type="text" name="customeremail" id="email" placeholder="Email" tabindex="2">
        <label for="cpassword">Confirm New Password</label>
        <input v-model="newCPassword" type="password" name="customercpassword" id="cpassword" placeholder="Password" tabindex="4">
        <input type="submit" value="Save Changes">
      </div>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    userDetails () {
      return this.$store.getters.getUserDetails
    }
  },
  data () {
    return {
      userName: null,
      userEmail: null,
      newPassword: null,
      newCPassword: null,
      errorMessage: null
    }
  },
  methods: {
    updateUserCredentials () {
      if(this.newPassword && this.newCPassword){
        if(this.newPassword == this.newCPassword){
          this.$store.dispatch('updateUserCredentials', {
            name: this.userName,
            email: this.userEmail,
            password: this.newPassword
          })
          .then(response => this.$router.push({ name: 'Signin' }))
          .catch(err => this.errorMessage = err.response.data.error.message)
        } else {
          this.errorMessage = 'Passwords do not match. Please try again'
        }
      } else {
        this.$store.dispatch('updateUserCredentials', {
          name: this.userName,
          email: this.userEmail
        })
        .then(response => this.$router.push({ name: 'Signin' }))
        .catch(err => this.errorMessage = err.response.data.error.message)
      }
    }
  },
  created () {
    this.userName = this.userDetails.name
    this.userEmail = this.userDetails.email
  }
}
</script>

<style>
</style>
