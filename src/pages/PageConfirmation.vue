<template>
  <div v-if="asyncDataStatus_ready" class="checkout-container container shadowed margin-top-25 margin-bottom-5">
    <div class="delivery-info-container">
      <h2 class="delivery-info-container--title">Checkout</h2>
      <CheckOutProgress :stepNumber=2 />
    </div>
    <div class="confirmation-container">
      <div class="confirmation-container__ordersummary">
        <h3 class="confirmation-container__ordersummary--title">Order Summary</h3>
        <div class="confirmation-container__ordersummary--subheadings">
          <h3>Item</h3>
          <h3>Quantity</h3>
          <h3>Price</h3>
        </div>
        <ul class="confirmation-container__ordersummary--productslist">
          <li class="confirmation-container__ordersummary--product" v-for="item in shoppingCartItems" :key="item.item_id">
            <span class="ordersummary-product__name">{{item.name}}</span>
            <span class="ordersummary-product__quantity">{{item.quantity}}</span>
            <h3 class="ordersummary-product__price primary-color">${{item.subtotal}}</h3>
          </li> 
        </ul>
      </div>
      <div class="confirmation-container__deliveryaddress">
        <h3 class="confirmation-container__deliveryaddress--title">Delivery</h3>
        <h3 class="confirmation-container__deliveryaddress--subtitle">Address</h3>
        <p class="confirmation-container__deliveryaddress--address">
          {{`${userDetailsObj.address_1}, ${userDetailsObj.city}, ${userDetailsObj.country}, ${userDetailsObj.postal_code}`}}
        </p>
        <h3 class="confirmation-container__deliveryaddress--subtitle">Delivery options</h3>
        <p class="confirmation-container__deliveryaddress--deliveryoption">
          {{shippingType}}
        </p>
      </div>
    </div>
    <hr>
    <div class="total-container">
      <div class="total-container__couponshipping">
        <div class="subtotal">
          <h3 class="subtotal__title">Subtotal</h3>
          <h3 class="subtotal__price">${{cartTotalAmount}}</h3>
        </div>
        <div class="shipping">
          <h3 class="shipping__title">Shipping</h3>
          <h3 class="shipping__price">${{shippingCost}}</h3>
        </div>
      </div>
      <div class="total-container__grandtotal">
        <h3 class="grandtotal__title">Grandtotal</h3>
        <h2 class="grandtotal__price primary-color">${{totalCost}}</h2>
      </div>
    </div>
    <div class="delivery-buttons-container">
      <router-link :to="{name: 'Delivery'}" class="product__cart-btn btnghost" style="font-weight: 700">Back</router-link>
      <a @click="moveToPayment" class="product__cart-btn second" style="font-weight: 700">Confirm</a>
    </div>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CheckOutProgress from '@/components/common/CheckOutProgress.vue'
import {mapState, mapGetters} from 'vuex'
export default {
  mixins: [asyncDataStatus],
  components: {
    CheckOutProgress
  },
  data () {
    return {
      userDetailsObj: null,
      shippingId: null
    }
  },
  methods: {
    moveToPayment () {
      sessionStorage.setItem('amountToBePaid', this.totalCost)
      this.$store.commit('setAmountAfterShipping', this.totalCost)
      this.$store.dispatch('addAndReceiveOrderId', {
        cart_id: this.$store.state.cart.cartId,
        shipping_id: sessionStorage.getItem('shippingCostId'),
        tax_id: 1
      })
      .then(() => this.$router.push({name: 'Payment'}))
      
    }
  },
  computed: {
    ...mapGetters({
        shoppingCartItems: 'getShoppingCartItems', 
        shippingCosts: 'allShippingCosts'
      }),
    ...mapGetters(['cartTotalAmount']),
    shippingType () {
      return this.shippingCosts.find(cost => cost.shipping_id == this.shippingId).shipping_type
    },
    shippingCost () {
      return parseInt(this.shippingCosts.find(cost => cost.shipping_id === this.shippingId).shipping_cost)
    },
    totalCost () {
      let total = parseFloat(this.cartTotalAmount) + this.shippingCost
      return parseFloat(Math.round(total * 100) / 100).toFixed(2)
    }
  },
  created () {
    this.$store.dispatch('fetchShippingCosts')
    .then(() => {
      this.shippingId = parseInt(sessionStorage.getItem('shippingCostId'))
      Event.$on('userDetailsConfirmation', userDetailsObj => {
        this.userDetailsObj = userDetailsObj
      })
      if(!this.userDetailsObj) {
        this.$store.dispatch('fetchUserDetails').then(() => {
          this.userDetailsObj = this.$store.state.auth.userDetails
          this.asyncDataStatusFetch()
        })
      } else {
        this.asyncDataStatusFetch()
      }
    })
  }
}
</script>

<style>
  p{
    font-weight: normal;
  }
</style>
