<template>
  <div class="authentication-container">
    <Signin />
    <Register />
  </div>
</template>

<script>
import Signin from '@/components/SigninComponent.vue'
import Register from '@/components/RegisterComponent.vue'
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
