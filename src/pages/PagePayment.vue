<template>
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
    <!-- Copied styles from delivery.html BE AWARE !!-->
    <!-- <form class="delivery-info-container--personalform">
      <div class="form__left-side">
        <label for="fname">Card number</label>
        <input type="text" name="fname" id="fname" tabindex='1' placeholder="**** **** **** ****">
        <div class="form__subdivision">
          <div class="form__subdivision--valid">
            <label for="address">Valid Thru</label>
            <input type="text" name="address" id="address" tabindex='3' placeholder="MM / YY">
          </div>
          <div class="form__subdivision--cvv">
            <label for="state">CVV / CVC *</label>
            <input type="text" name="state" id="state" tabindex='5' placeholder="***">
          </div>
        </div>
      </div>
      <div class="form__right-side">
        <label for="lname">Cardholder's Name</label>
        <input type="text" name="lname" id="lname" tabindex='2' placeholder="John Doe">
        <p class="cvv__info">
          * CVV or CVC is the card security code, unique three digits number on the back of your card separate from its
          number.
        </p>
      </div>
    </form> -->
    <!-- End of warning -->
    <!-- <StripePayment /> -->
    <Stripe />
  </div>
</template>

<script>
import Stripe from '@/components/StripeNormalComponent'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CheckOutProgress from '@/components/CheckOutProgress'
export default {
  mixins: [asyncDataStatus],
  components: {
    CheckOutProgress, Stripe
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
