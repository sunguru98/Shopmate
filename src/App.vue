<template>
  <div id="app" v-if="asyncDataStatus_ready">
    <TheNavBar @displayCart="isCartClicked = true" :departments="departments"/>
    <div :class="{'overlay': isCartClicked}"></div>
    <div class="container">
      <ShoppingCart :displayStatus="isCartClicked" @closeCart="isCartClicked = false"/>
      <router-view v-show="revealPage" @pageReady="revealPage = true"/>
      <AppLoadingComponent v-show="!revealPage"/>
    </div>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
import {mapGetters} from 'vuex'
import AppLoadingComponent from '@/components/AppLoadingComponent.vue'
import TheNavBar from '@/components/TheHeader.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
export default {
  mixins: [asyncDataStatus],
  data () {
    return {
      revealPage: false,
      isCartClicked: false
    }
  },
  computed: {
    ...mapGetters({
      departments: 'allDepartments'
    })
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      // to and from are both route objects. must call `next`.
      this.revealPage = false
      next()
    })
    this.$store.dispatch('fetchDepartments')
    .then(() => this.$store.dispatch('fetchCategories'))
    .then(() => this.asyncDataStatusFetch())
  },
  components: {
    TheNavBar, ShoppingCart, AppLoadingComponent
  }
}
</script>

<style lang="scss">
  @import '@/assets/sass/main.scss';
</style>
