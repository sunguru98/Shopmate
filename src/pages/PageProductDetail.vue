<template>
  <div v-if="asyncDataStatus_ready" class="shadowed container margin-top-25 margin-bottom-5">
    <div class="product-container padding-25 white-bg">
      <div class="product__image-container">
        <img :src="selectedImage" alt="Shirt Large Picture" class="product__image-container--currentimg">
        <div class="product__image-container--smallimgs">
          <img @click="selectedImage = product.image" :src="product.image" alt="Other Shirt pictures" class="product__image" :class="{selected__image: selectedImage == product.image}">
          <img @click="selectedImage = product.image_2" :src="product.image_2" alt="Other Shirt pictures" class="product__image" :class="{selected__image: selectedImage == product.image_2}">
        </div>
      </div>
      <div class="product__specs-container">
        <span class="product__breadcrumbs">
          <router-link :to="{name: 'Home'}">Home</router-link>&nbsp;&middot;&nbsp;Shirts
        </span>
        <h2 class="product__specs-container--name">
          {{product.name}}
        </h2>
        <h2 class="product__specs-container--price primary-color">${{product.discounted_price == '0.00' ? product.price : product.discounted_price}}</h2>
        <div class="product__specs-container--colors">
          <h3>Color</h3>
          <div v-if="product.colors" class="product__allcolors">
            <div :key="color.attribute_value_id"
              @click="cartObj.attributes.color = color.attribute_value"
              :class="[color.attribute_value.toLowerCase(), {color__active: color.attribute_value == cartObj.attributes.color}]" v-for="color in product.colors">
            </div>
          </div>
        </div>
        <div class="product__specs-container--sizes">
          <h3>Size</h3>
          <ul class="product__sizes-container">
            <li @click="cartObj.attributes.size = size.attribute_value" :class="['product__size', {selected__size: size.attribute_value == cartObj.attributes.size}]" 
            v-for="size in product.sizes" :key="size.attribute_value_id">{{size.attribute_value}}</li>
          </ul>
        </div>
        <div class="product__specs-container--quantity">
          <h3>Quantity</h3>
          <div class="product__buttons">
            <button class="rounded product__decrement" @click="productQuantity--" :disabled="productQuantity === 0">
              <img src="@/assets/img/minus.svg" alt="minus button">
            </button>
            <span class="product__quantity-number">{{productQuantity}}</span>
            <button class="rounded product__increment" @click="productQuantity++">
              <img src="@/assets/img/plus.svg" alt="plus button">
            </button>
          </div>
        </div>
        <button @click="addItemToCartWithQuantity" class="product__cart-btn" :disabled="!inputReceived">Add to Cart</button>
      </div>
    </div>
    <div class="reviews-container padding-25">
      <div class="product__reviews">
        <h2>Product Reviews</h2>
        <ul class="product__reviews-list">
          <li class="product__review product__review-container" v-for="review in reviews" :key="review.created_on">
            <div class="review__left">
              <div class="product__specs-container--ratings">
                <img :src="rating <= review.rating ? require('@/assets/img/goldstar.svg'): require('@/assets/img/star.svg')" alt="Star image" v-for="rating in 5" :key="rating">
              </div>
              <h3 class="review__name">{{review.name}}</h3>
              <span class="review__time">{{review.created_on | humanReadableTime}}</span>
            </div>
            <div class="review__right">
              <span class="review__paragraph">
                {{review.review}}
              </span>
            </div>
          </li>
        </ul>
        <hr>
      </div>
      <div class="add_reviews">
        <h2>Add a review</h2>
        <form action="#" class="review__form">
          <div class="review__form--username">
            <label for="username">Username</label>
            <input type="text" name="username" id="username">
          </div>
          <div class="review__form--review-text">
            <label for="review-text">Your review</label>
            <div class="review-text__textarea">
              <textarea id="review-text" name="review-text" cols="54" rows="8"></textarea>
              <span class="review-text__note">Your review must be at least 50 characters</span>
            </div>
          </div>
          <div class="review__form--rating">
            <label for="rating">Overall rating</label>
            <select name="rating" id="rating">
              <option value="" selected disabled>None</option>
              <option v-for="rating in 5" :value="rating" :key="rating">{{rating}}</option>
            </select>
          </div>
          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import cartObject from '@/mixins/cartObject'
import moment from 'moment'
import {mapGetters} from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  props: ['id'],
  mixins: [asyncDataStatus, cartObject],
  filters: {
    humanReadableTime (value) {
      return moment(value).startOf('day').fromNow(); 
    }
  },
  data () {
    return {
      productQuantity: 1,
      selectedImage: null
    }
  },
  methods: {
    addItemToCartWithQuantity () {
      this.$store.dispatch('addItemsToCart', 
      { cartObj: { 
          ...this.cartObj, 
          attributes: JSON.stringify(this.cartObj.attributes)
        }, 
        cartQuantity: this.productQuantity
      })
    }
  },
  computed: {
    ...mapGetters({
      cartId: 'getCartId'
    }),
    product () {
      return this.$store.state.singleProduct
    },
    reviews () {
      return this.$store.getters.allReviews
    },
    averageRating () {
      return this.reviews[1].rating
    }
  },
  created () {
    this.$store.dispatch('fetchProductsByID', this.id)
      .then(() => {
        this.cartObj.product_id = parseInt(this.id)
        this.$store.dispatch('fetchReviewsByProductID', this.id)
        this.selectedImage = this.product.image,
        this.asyncDataStatusFetch() 
      })
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/common/_colors.scss';
  button:disabled{
    cursor: not-allowed; pointer-events: all !important;
  }
  button{
    border: 1px solid $lighter-grey-color;
    transition: transform .1s;
  }
  button:active{
    transform: scale(.9)
  }
</style>
