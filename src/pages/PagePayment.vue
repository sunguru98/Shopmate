<template>
  <div>
    <Spinner />
    <div class="checkout-container container shadowed margin-top-25 margin-bottom-5">
      <div class="delivery-info-container">
        <h2 class="delivery-info-container--title">Checkout</h2>
        <CheckOutProgress :stepNumber=3 />
      </div>
      <div class="payment-choices-container">
        <div class="payment-choices-container--visa selected__method">
          <div class="card__images">
            <img src="@/assets/img/visa.svg" alt="Card image" class="card__images--visa">
            <img src="@/assets/img/mastercard.svg" alt="Mastercard image" class="card__images--mastercard">
          </div>
          <div class="card__amount">
            <label for="card">Pay ${{totalAmount}} with credit card</label>
          </div>
        </div>
      </div>
      <Stripe />
    </div>
  </div>
  
</template>

<script>
import Spinner from '@/components/AppLoadingComponent'
import Stripe from '@/components/StripeNormalComponent'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CheckOutProgress from '@/components/CheckOutProgress'
import { setTimeout } from 'timers';
export default {
  mixins: [asyncDataStatus],
  components: {
    CheckOutProgress, Stripe, Spinner
  },
  computed: {
    totalAmount () {
      return this.$store.state.amountToBePaid || sessionStorage.getItem('amountToBePaid')
    }
  },
  created () {
    this.asyncDataStatusFetch()
  }
}
</script>

<style scoped>
  .delivery-info-container--personalform{
    padding: 0 8rem !important;
  }
</style>
