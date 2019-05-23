<template>
  <div class="products-area__product">
      <div class="normal-view">
        <img :src="product.thumbnail" alt="Shirt image" class="products-area__product-image">
        <h2 class="products-area__product-name">{{product.name}}</h2>
        <h2 class="products-area__product-discountedprice primary-color">${{product.discounted_price == '0.00' ? product.price : product.discounted_price}}</h2>
        <span v-if="product.discounted_price != '0.00'" class="products-area__product-originalprice">${{product.price}}</span>
      </div>
      <div class="hovered-view">
        <h3 class="product__title">{{product.name}}</h3>
        <h2 class="product__discountedprice primary-color">${{product.discounted_price == '0.00' ? product.price : product.discounted_price}}</h2>
        <div v-if="product.colors" class="product__colors">
          <div @click="cartObj.attributes.color = color.attribute_value"
          :key="color.attribute_value_id"
          :class="[color.attribute_value.toLowerCase(), {color__active: color.attribute_value == cartObj.attributes.color}]" 
          v-for="color in product.colors"></div>
        </div>
        <div class="product__decisions" v-if="product.sizes">
          <select name="size" class="product__sizes" v-model="cartObj.attributes.size">
            <option selected disabled value="Size">Size</option>
            <option :key="size.attribute_value_id" v-for="size in product.sizes" :value="size.attribute_value">{{size.attribute_value}}</option>
          </select>
          <button @click="addItemToCart" class="product__cart-btn" :disabled="!inputReceived">Add to Cart</button>
        </div>
        <router-link :to="{name: 'ProductDetail', params: {id: product.product_id}}" class="product__detail primary-color">
          <span>View more</span>
        </router-link>
      </div>
    </div>
</template>

<script>
import cartObject from '@/mixins/cartObject'
import {mapGetters} from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mixins: [cartObject],
  computed: {
    ...mapGetters({
      cartId: 'getCartId'
    })
  },
  methods: {
    addItemToCart () {
      this.$store.dispatch('addItemToCart', 
      {
        ...this.cartObj, 
        attributes: JSON.stringify(this.cartObj.attributes)
      })
    }
  },
  created () {
    this.cartObj.product_id = this.product.product_id
    this.cartObj.attributes.size = 'Size'
  }
}
</script>

<style>

</style>
