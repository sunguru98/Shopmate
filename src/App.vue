<template>
  <div id="app" v-if="asyncDataStatus_ready">
    <TheNavBar @displayCart="isCartClicked = true" :departments="departments"/>
    <div :class="{'overlay': isCartClicked}"></div>
    <div class="container">
      <ShoppingCart :displayStatus="isCartClicked" @closeCart="isCartClicked = false"/>
      <router-view :key="$route.path" v-show="revealPage" @pageReady="revealPage = true"/>
      <Spinner v-show="!revealPage"/>
    </div>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapGetters,mapState } from 'vuex'
import Spinner from '@/components/AppLoadingComponent.vue'
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
      departments: 'allDepartments',
    }),
    ...mapState(['accessToken'])
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.revealPage = false
      next()
    })
    
    this.$store.dispatch('fetchDepartments')
    .then(() => this.$store.dispatch('fetchCategories'))
    .then(() => !this.$store.getters.isLoggedIn ? this.$store.dispatch('fetchCartId') : this.$store.dispatch('fetchProductsOnCart'))
    .then(() => this.accessToken ? this.$store.dispatch('fetchUserDetails') : '')
    .then(() => this.$store.dispatch('fetchShippingRegions'))
    .then(() => this.asyncDataStatusFetch())
  },
  components: {
    TheNavBar, ShoppingCart, Spinner
  }
}
</script>

<style lang="scss">
  @import '@/assets/sass/main.scss';
  span{
    font-weight: normal
  }
  select, button{
    font-weight: 700;
  }
  .product__breadcrumbs a{
    font-family: 'Open Sans', sans-serif;
  }
</style>
