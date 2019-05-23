<template>
  <div id="app" v-if="asyncDataStatus_ready">
    <TheNavBar @displayCart="isCartClicked = true" :departments="departments"/>
    <div :class="{'overlay': isCartClicked || isLogoutClicked}"></div>
    <div class="container">
      <LogoutConfirm :displayStatus="isLogoutClicked" @closeLogout="isLogoutClicked = false"/>
      <ShoppingCart :displayStatus="isCartClicked" @closeCart="isCartClicked = false"/>
      <router-view :key="$route.path" v-show="revealPage" @pageReady="revealPage = true"/>
      <Spinner v-show="!revealPage"/>
    </div>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapGetters,mapState } from 'vuex'
import Spinner from '@/components/common/AppLoadingComponent.vue'
import TheNavBar from '@/components/header/TheHeader.vue'
import ShoppingCart from '@/components/common/ShoppingCart.vue'
import LogoutConfirm from '@/components/auth/LogoutConfirmation.vue'
export default {
  mixins: [asyncDataStatus],
  data () {
    return {
      revealPage: false,
      isCartClicked: false,
      isLogoutClicked: false
    }
  },
  computed: {
    ...mapGetters({
      departments: 'allDepartments',
    }),
    accessToken () {
      return this.$store.state.auth.accessToken
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.revealPage = false
      next()
    })
    Event.$on('logoutClicked', () => {
      this.isLogoutClicked = true
    })
    this.$store.dispatch('fetchDepartments')
    .then(() => this.$store.dispatch('fetchCategories'))
    .then(() => !this.$store.getters.getCartId ? this.$store.dispatch('fetchCartId') : this.$store.dispatch('fetchProductsOnCart'))
    .then(() => this.accessToken ? this.$store.dispatch('fetchUserDetails') : '')
    .then(() => this.$store.dispatch('fetchShippingRegions'))
    .then(() => {
      this.asyncDataStatusFetch()
    })
  },
  components: {
    TheNavBar, ShoppingCart, Spinner, LogoutConfirm
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
