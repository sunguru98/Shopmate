<template>
  <Spinner v-if="$store.state.loadingState"/>
  <div v-else class="checkout-container container shadowed margin-top-25 margin-bottom-5">
    <div class="delivery-info-container">
      <h2 class="delivery-info-container--title">Checkout</h2>
      <CheckOutProgress :stepNumber=4 />
    </div>
    <div class="success-container">
      <img src="@/assets/img/rocket.svg" alt="Rocket image" class="success-container__successimage">
      <h1 class="success-container__successtitle">
        Success!
      </h1>
      <h2 class="success-container__successmessage primary-color" style="margin-bottom: 2rem">
        Your items will be shipped shortly, <br>
      </h2>
      <p style="margin-bottom: 2rem" class="success-container__successmessage">
        Your can view your receipt <a target="_blank" :href="stripeResponse.receipt_url" class="primary-color" style="font-weight: 700">here</a>, <br>
      </p>
      <router-link @click="backToHome" style="padding: 2rem 0" :to="{name: 'Home'}" class="success-container__gohomebutton">Back to shop</router-link>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/common/AppLoadingComponent'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CheckOutProgress from '@/components/common/CheckOutProgress'
import {mapState} from 'vuex'
export default {
  mixins: [asyncDataStatus],
  components: {
    CheckOutProgress, Spinner
  },
  computed: {
    stripeResponse () {
      return this.$store.getters.getStripeResponse
    }
  },
  created () {
    this.$store.dispatch('receiveChargeFromServer')
      .then((response) => {
        this.$store.dispatch('clearData')
        this.asyncDataStatusFetch()
      })
  },
  methods: {
    backToHome () {
      this.$store.dispatch('fetchCartId')
        .then(response => localStorage.setItem('cartId', response))
    }
  }
}
</script>

<style>

</style>
