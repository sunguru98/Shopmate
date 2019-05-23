<template>
  <nav class="general__navbar topbar">
    <div class="container">
      <h3 class="general__navbar-greeting" v-if="!isLoggedIn">
        <router-link :to="{name: 'Signin'}" class="primary-color">Sign in</router-link> or <router-link :to="{name: 'Register'}" class="primary-color">Register</router-link>
      </h3>
      <h3 class="general__navbar-greeting" v-if="isLoggedIn">
        Hi {{userName}} ! &nbsp;
        <router-link :to="{name: 'Profile'}" class="primary-color">My Profile</router-link>&nbsp;&nbsp;
        <a @click.prevent="activateLogout" class="primary-color">Logout</a>
      </h3>
      <div class="general__navbar-sales">
        <ul>
          <li><a style="cursor: default">Daily deals</a></li>
          <li><a style="cursor: default">Sell</a></li>
          <li><a style="cursor: default">Help & Contact</a></li>
        </ul>
      </div>
      <div class="general__navbar-cart" @click.prevent="showCart" v-if="!this.$route.path.includes('/checkout')">
        <div class="general__navbar-cart--notifications" >
          <a href="" style="display: flex; cursor: pointer"><img src="@/assets/img/cart.svg" alt="Cart image" class="cart__image"></a>
          <span class="cart__badge" v-if="cartItems.length > 0">{{cartItems.length}}</span>
        </div>
        <h3 style="cursor: pointer" class="general__navbar-cart--amount">Your bag: ${{cartItems.length === 0 ? '0.00' : totalAmount}}</h3>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    showCart () {
      this.$emit('cartClicked')
    },
    activateLogout () {
      if (this.cartItems.length > 0) {
        Event.$emit('logoutClicked')
      } else {
        this.$store.dispatch('logOut', true)
          .then(() => this.$router.push({ name: 'Home' }))
      }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    cartItems () {
      return this.$store.getters.getShoppingCartItems
    },
    totalAmount () {
      return this.$store.getters.cartTotalAmount
    },
    userName () {
      return this.$store.getters.fetchFirstName
    }
  }
}
</script>
