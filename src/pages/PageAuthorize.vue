<template>
  <div class="authentication-container">
    <Signin />
    <Register />
  </div>
</template>

<script>
import Signin from '@/components/auth/SigninComponent.vue'
import Register from '@/components/auth/RegisterComponent.vue'
export default {
  components: {
    Signin,
    Register
  },
  created () {
    this.$emit('pageReady')
  }
}
</script>

<style>

</style>
