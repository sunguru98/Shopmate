<template>
  <div v-if="asyncDataStatus_ready" class="checkout-container container shadowed margin-top-25 margin-bottom-5">
    <div class="delivery-info-container">
      <h2 class="delivery-info-container--title">Checkout</h2>
      <CheckOutProgress :stepNumber=1 />
      <form class="delivery-info-container--personalform">
        <div class="form__left-side">
          <label for="fname">First name *</label>
          <input v-model="userDetailsObj.fName" type="text" name="fname" id="fname" tabindex='1' required>
          <label for="address">Address *</label>
          <input v-model="userDetailsObj.address" type="text" name="address" id="address" tabindex='3' required>
          <label for="state">Country *</label>
          <input v-model="userDetailsObj.country" type="text" name="state" id="state" tabindex='5' required>
          <label for="country" style="color: #000; display: inline-block">Region * &nbsp;<span class="primary-color specific__fontstyle">{{userDetails.region}}</span></label>
        </div>
        <div class="form__right-side">
          <label for="lname">Last name *</label>
          <input v-model="userDetailsObj.lName" type="text" name="lname" id="lname" tabindex='2' required>
          <label for="city">City *</label>
          <input v-model="userDetailsObj.city" type="text" name="city" id="city" tabindex='4' required>
          <label for="pincode">ZIP code *</label>
          <input v-model="userDetailsObj.postalCode" type="text" name="pincode" id="pincode" tabindex='6' required>
        </div>
      </form>
      <hr>
      <div class="container__combined" style="display: flex; align-items: center">
        <h2 class="delivery-info-container--title">Delivery options *</h2>
        <div v-if="errorMessage" class="error__message" style="width: 50%; margin-left: 5rem">{{errorMessage}}
          <button @click="errorMessage = null" class="error__message--btn"><img src="@/assets/img/closewhite.svg" alt="Close button"></button>
        </div>
      </div>
      <form class="delivery-info-container--deliveryform">
        <div class="deliveryoption" :key="shippingCost.shipping_id" v-for="shippingCost in shippingCosts">
          <input style="cursor: pointer" :value="shippingCost.shipping_id" v-model="userDetailsObj.deliveryId" type="radio" name="delivery" :id="'opt'+shippingCost.shipping_id" required>
          <label :for="'opt'+shippingCost.shipping_id">
            <h3>{{shippingCost.shipping_type.split(' (')[0]}}: <span>({{shippingCost.shipping_type.split(' (')[1]}}</span></h3>
          </label>
        </div>
      </form>
    </div>
    <div class="delivery-buttons-container">
      <router-link :to="{name: 'Home'}" class="product__cart-btn btnghost" style="font-weight: 700">Back to shop</router-link>
      <a @click="selectShipCosts" class="product__cart-btn second" style="font-weight: 700">Next Step</a>
    </div>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CheckOutProgress from '@/components/common/CheckOutProgress.vue'
import {mapState} from 'vuex'
export default {
  mixins: [asyncDataStatus],
  components: {
    CheckOutProgress
  },
  data () {
    return {
      userDetailsObj: {
        fName: '',
        lName: '',
        address_1: '',
        city: '',
        country: '',
        postalCode: '',
        deliveryId: null
      }, 
      errorMessage: null
    }
  },
  computed: {
    userDetails () {
      return this.$store.getters.getUserDetails
    },
    shippingCosts () {
      return this.$store.state.shipping.shippingCosts
    }
  },
  created () {
    this.$store.dispatch('fetchShippingCosts')
    .then(() => {
      if (this.userDetails) {
        this.userDetailsObj.fName = this.userDetails.name.split(' ').length > 0 ? this.userDetails.name.split(' ')[0] : this.userDetails.name
        this.userDetailsObj.lName = this.userDetails.name.split(' ').length > 0 ? this.userDetails.name.split(' ')[1] : ''
        this.userDetailsObj.address = this.userDetails.address_1,
        this.userDetailsObj.city = this.userDetails.city,
        this.userDetailsObj.country = this.userDetails.country,
        this.userDetailsObj.postalCode = this.userDetails.postal_code
        this.asyncDataStatusFetch()
      }
    })
  },
  methods: {
    selectShipCosts () {
      if(!this.userDetailsObj.deliveryId){
        this.errorMessage = 'Please select a shipping method'
      } else {
        Event.$emit('userDetailsConfirmation', this.userDetailsObj)
        sessionStorage.setItem('shippingCostId', this.userDetailsObj.deliveryId)
        this.$router.push({name: 'Confirmation'})
      }
    }
  }
}
</script>

<style>
  .specific__fontstyle{
    font-family: Montserrat; font-weight: 700;
  }
</style>
