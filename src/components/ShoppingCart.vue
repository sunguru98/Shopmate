<template>
  <section class="shopping__cart" :class="{'is__shopping': displayStatus}">
      <button class="shopping__cart-closebtn">
        <a><img @click="closeCart" src="@/assets/img/closebtn.svg" alt="Close Button" ></a>
      </button>
      <div class="shopping__cart-productscontainer" v-if="cartItems.length > 0">
        <h2 class="shopping__cart-count">{{cartItems.length}} Items in Your Cart</h2>
        <div class="shopping__cart-titles">
          <h3 class="shopping__cart-title">Item</h3>
          <h3 class="shopping__cart-title">Colour</h3>
          <h3 class="shopping__cart-title">Size</h3>
          <h3 class="shopping__cart-title">Quantity</h3>
          <h3 class="shopping__cart-title">Price</h3>
        </div>
        <hr>
        <ul class="shopping__cart-products">
          <li :key="item.item_id" v-for="item in cartItems" class="shopping__cart-product shopping__cart--product1">
            <div class="shopping__cart-details">
              <img src="@/assets/img/shirt1.png" alt="Shirt image" class="shopping__cart-details--image">
              <div class="shopping__cart-details--infos">
                <h3 class="shopping__cart-details--infos-name">Red T-shirt</h3>
                <p class="shopping__cart-details--infos-category">Mens</p>
                <a class="shopping__cart-details--infos-removebtn">
                  <img src="@/assets/img/closered.svg" alt="Close red button">&nbsp;Remove
                </a>
              </div>
            </div>
            <div class="shopping__cart-color">Red</div>
            <div class="shopping__cart-size">XL</div>
            <div class="shopping__cart-quantity">
              <div class="product__buttons">
                <button class="rounded product__decrement">
                  <img src="@/assets/img/minus.svg" alt="minus button">
                </button>
                <span class="product__quantity-number">4</span>
                <button class="rounded product__increment">
                  <img src="@/assets/img/plus.svg" alt="plus button">
                </button>
              </div>
            </div>
            <div class="shopping__cart-price">
              <h2>$16.99</h2>
            </div>
          </li>
        </ul>
      </div>
      <h1 class="shopping__cart-message" v-else>No products added. Do add some !</h1>
      <div class="shopping__cart-total" v-if="cartItems.length > 0">
        <h2>
          Total:&nbsp;&nbsp;
          <span
            class="primary-color"
            style="font-family: 'Montserrat', sans-serif; font-size: 2.4rem; font-weight: 700"
          >$23.98</span>
        </h2>
      </div>
      <div class="shopping__cart-buttons">
        <div class="shopping__cart-buttonscontainer">
          <a @click="closeCart" class="shopping__cart-button product__cart-btn btnghost">Back to Shop</a>
          <a href="#" class="shopping__cart-button product__cart-btn" v-if="cartItems.length > 0">Checkout</a>
        </div>
      </div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    cartItems () {
      return this.$store.getters.getShoppingCartItems
    }
  },
  props: {
    displayStatus: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeCart () {
      this.$emit('closeCart')
    }
  }
}
</script>

<style scoped>
  a{
    font-weight: 700;
  }
</style>
