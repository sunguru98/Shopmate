<template>
  <div v-if="asyncDataStatus_ready" class="checkout-container container shadowed margin-top-25 margin-bottom-5">
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
        Your can view your receipt <a target="_blank" :href="stripeResponse.receipt_url" class="primary-color">here</a>, <br>
      </p>
      <router-link style="padding: 2rem 0" :to="{name: 'Home'}" class="success-container__gohomebutton">Back to shop</router-link>
    </div>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CheckOutProgress from '@/components/CheckOutProgress'
import {mapState} from 'vuex'
export default {
  mixins: [asyncDataStatus],
  components: {
    CheckOutProgress
  },
  computed: {
    ...mapState(['stripeResponse'])
  },
  created () {
    this.$store.dispatch('clearData')
    this.asyncDataStatusFetch()
  }
}
</script>

<style>

</style>
