<template>
  <div class="profile__container--address">
    <div class="container__combined" style="display: flex; align-items: center">
      <h2 class="profile__container--title">Update Address</h2>
      <div v-if="errorMessage" class="error__message" style="width: 50%; margin-left: 5rem">{{errorMessage}}
        <button @click="errorMessage = null" class="error__message--btn"><img src="@/assets/img/closewhite.svg" alt="Close button"></button>
      </div>
    </div>
    <form action="#" class="profile__container--addressform" @submit.prevent="updateUserAddress">
      <div class="form__leftside">
        <label for="address">Address</label>
        <input v-model="userAddressObj.address_1" type="text" name="customeraddress" id="address" placeholder="Address" tabindex="5" required>
        <label for="country">Country</label>
        <input v-model="userAddressObj.country" type="text" name="customercountry" id="country" placeholder="Country" tabindex="7" required>
        <label for="region">Region</label>
        <select name="customerregion" id="region" v-model="userAddressObj.regionId" tabindex="9" required>
          <option :disabled="shippingRegion.shipping_region_id === 1" :selected="shippingRegion.shipping_region_id === 1" :key="shippingRegion.shipping_region_id" :value="shippingRegion.shipping_region_id" v-for="shippingRegion in shippingRegions">{{shippingRegion.shipping_region}}</option>
        </select>
      </div>
      <div class="form__rightside">
        <label for="city">City</label>
        <input v-model="userAddressObj.city" type="text" name="customercity" id="city" placeholder="City" tabindex="6" required>
        <label for="postalcode">Postal code</label>
        <input v-model="userAddressObj.postalCode" type="text" name="customerpostalcode" id="postalcode" placeholder="Postal code" tabindex="8" required>
        <input type="submit" value="Save Changes" class="second">
      </div>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      errorMessage: null,
      userAddressObj: {
        address_1: null,
        city: null,
        country: null,
        postalCode: null,
        regionId: null
      }
    }
  },
  computed: {
    shippingRegions () {
      return this.$store.getters.allShippingRegions
    },
    currentShippingRegion () {
      return this.shippingRegions.find(shippingRegion => shippingRegion.shipping_region_id === this.userAddressObj.regionId).shipping_region
    },
    userDetails () {
      return this.$store.getters.getUserDetails
    }
  },
  methods: {
    updateUserAddress () {
      this.userAddressObj.postalCode = parseInt(this.userAddressObj.postalCode)
      if (!isNaN(this.userAddressObj.postalCode)) {
        if (this.userAddressObj.regionId === 1) {
          this.errorMessage = 'Please select your region'
        } else {
          this.$store.dispatch('updateUserAddress', {
            address_1: this.userAddressObj.address_1,
            city: this.userAddressObj.city,
            region: this.currentShippingRegion,
            postal_code: this.userAddressObj.postalCode,
            country: this.userAddressObj.country,
            shipping_region_id: this.userAddressObj.regionId
          })
          .then((response) => this.errorMessage = null)
          .catch(err => this.errorMessage = err.response.data.error.message)
        }
      } else {
        this.errorMessage = 'Please enter a valid postal code'
      }
    }
  },
  created () {
    this.errorMessage = (!this.userDetails.address_1 || !this.userDetails.country || !this.userDetails.city || this.userDetails.shipping_region_id === 1) ? 'Please update your address' : null
    this.userAddressObj.address_1 = this.userDetails.address_1
    this.userAddressObj.city = this.userDetails.city
    this.userAddressObj.country = this.userDetails.country
    this.userAddressObj.postalCode = this.userDetails.postal_code
    this.userAddressObj.regionId = this.userDetails.shipping_region_id
  }
}
</script>

<style>
</style>
