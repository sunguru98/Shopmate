<template>
  <div id="app">
    <TheNavBar />
    <router-view/>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheHeader.vue'
export default {
  components: {
    TheNavBar
  }
}
</script>

<style lang="scss">
  @import '@/assets/sass/main.scss';
</style>
