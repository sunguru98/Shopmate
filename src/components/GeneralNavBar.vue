<template>
  <nav class="general__navbar topbar">
    <div class="container">
      <h3 class="general__navbar-greeting">
        Hi! <a href="#" class="primary-color">Sign in</a> or <a href="#" class="primary-color">Register</a>
      </h3>
      <div class="general__navbar-sales">
        <ul>
          <li><a href="">Daily Deals</a></li>
          <li><a href="">Sell</a></li>
          <li><a href="">Help & Contact</a></li>
        </ul>
      </div>
      <div class="general__navbar-cart">
        <div class="general__navbar-cart--notifications" >
          <a href="" style="display: flex" @click.prevent="showCart"><img src="@/assets/img/cart.svg" alt="Cart image" class="cart__image"></a>
          <span class="cart__badge" v-if="cartItems.length > 0">{{cartItems.length}}</span>
        </div>
        <h3 class="general__navbar-cart--amount">Your bag: ${{cartItems.length === 0 ? '0.00' : totalAmount}}</h3>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    showCart () {
      this.$emit('cartClicked')
    }
  },
  computed: {
    cartItems () {
      return this.$store.getters.getShoppingCartItems
    },
    totalAmount () {
      return this.$store.getters.cartTotalAmount
    }
  }
}
</script>
