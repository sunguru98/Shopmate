<template>
  <a @click.prevent="loginWithFacebook" class="signin-container--form__facebook">Login with facebook</a>
</template>

<script>
window.fbAsyncInit = function() {
  FB.init({
    appId: '354605828586487',
    cookie: true,
    xfbml: true,
    version: 'v3.3'
  });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
export default {
  methods: {
    loginWithFacebook () {
      FB.getLoginStatus( response => {
        if(!response.authResponse) {
          FB.login(response => {
            this.$store.dispatch('signInWithFacebook', response.authResponse.accessToken)
          }, { scope: 'public_profile,email' });
        }
        else {
          console.log(response.authResponse.accessToken)
          this.$store.dispatch('signInWithFacebook', response.authResponse.accessToken)
          .then(response => console.log(response))
          .catch(err => console.log(err.response.data.error)) 
        }
      }, { scope: 'public_profile,email' });
      
    }
  }
}
</script>

<style>

</style>
