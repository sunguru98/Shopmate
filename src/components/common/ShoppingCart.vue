<template>
  <section class="shopping__cart" :class="{'is__shopping': displayStatus}">
    <button class="shopping__cart-closebtn">
      <a>
        <img @click="closeCart" src="@/assets/img/closebtn.svg" alt="Close Button">
      </a>
    </button>
    <div class="shopping__cart-productscontainer" v-if="cartItems.length > 0">
      <h2
        class="shopping__cart-count"
      >{{cartItems.length}} {{cartItems.length > 1 ? 'Items' : 'Item'}} in Your Cart</h2>
      <div class="shopping__cart-titles">
        <h3 class="shopping__cart-title">Item</h3>
        <h3 class="shopping__cart-title">Colour</h3>
        <h3 class="shopping__cart-title">Size</h3>
        <h3 class="shopping__cart-title">Quantity</h3>
        <h3 class="shopping__cart-title">Price</h3>
      </div>
      <hr>
      <ul class="shopping__cart-products">
        <li
          :key="item.item_id"
          v-for="item in cartItems"
          class="shopping__cart-product shopping__cart--product1"
        >
          <div class="shopping__cart-details">
            <img
              :src="$store.state.imagesEndpoint+'/'+item.image"
              alt="Shirt image"
              class="shopping__cart-details--image"
            >
            <div class="shopping__cart-details--infos">
              <h3 class="shopping__cart-details--infos-name">{{item.name}}</h3>
              <a
                @click.prevent="removeCartItem(item.item_id)"
                class="shopping__cart-details--infos-removebtn"
              >
                <img src="@/assets/img/closered.svg" alt="Close red button">&nbsp;Remove
              </a>
            </div>
          </div>
          <div class="shopping__cart-color">{{item.attributes | parsedColorValue}}</div>
          <div class="shopping__cart-size">{{item.attributes | parsedSizeValue}}</div>
          <div class="shopping__cart-quantity">
            <div class="product__buttons">
              <button
                class="rounded product__decrement"
                @click.prevent="handleCountingAction(item.quantity, 'minus', item.item_id)"
              >
                <img src="@/assets/img/minus.svg" alt="minus button">
              </button>
              <span class="product__quantity-number">{{item.quantity}}</span>
              <button
                class="rounded product__increment"
                @click.prevent="handleCountingAction(item.quantity, 'plus', item.item_id)"
              >
                <img src="@/assets/img/plus.svg" alt="plus button">
              </button>
            </div>
          </div>
          <div class="shopping__cart-price">
            <h2>${{item.subtotal}}</h2>
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
        >${{cartTotalAmount}}</span>
      </h2>
    </div>
    <div class="shopping__cart-buttons">
      <div class="shopping__cart-buttonscontainer">
        <a @click="closeCart" class="shopping__cart-button product__cart-btn btnghost">Back to Shop</a>
        <a v-if="cartItems.length > 0"
          @click="emptyCart"
          style="margin-right: auto; margin-left: 2.5rem"
          class="shopping__cart-button product__cart-btn btnghost"
        >Empty cart</a>
        <a
          @click="checkOutCart"
          class="shopping__cart-button product__cart-btn"
          v-if="cartItems.length > 0"
        >Checkout</a>
      </div>
    </div>
  </section>
</template>

<script>
import Spinner from "@/components/common/AppLoadingComponent";
import { mapState } from "vuex";
export default {
  computed: {
    cartItems() {
      return this.$store.getters.getShoppingCartItems;
    },
    cartTotalAmount() {
      return this.$store.getters.cartTotalAmount;
    },
    loadingState() {
      return this.$store.getters.getLoadingState;
    },
    cartId() {
      return this.$store.getters.getCartId;
    }
  },
  components: { Spinner },
  methods: {
    closeCart() {
      this.$emit("closeCart");
    },
    removeCartItem(cartItemId) {
      this.$store.dispatch("removeShoppingCartItem", cartItemId);
    },
    checkOutCart() {
      this.$router.push({ name: "Delivery" });
      this.closeCart();
    },
    emptyCart() {
      this.$store
        .dispatch("emptyShoppingCart", this.cartId)
        .then(() => this.closeCart());
    },
    handleCountingAction(itemQuantity, type, cartItemId) {
      if (type === "plus") {
        this.$store.dispatch("updateCartItemQuantity", {
          item_id: cartItemId,
          quantity: itemQuantity + 1
        });
      } else {
        if (itemQuantity - 1 === 0) {
          this.$store.dispatch("removeShoppingCartItem", cartItemId);
        } else {
          this.$store.dispatch("updateCartItemQuantity", {
            item_id: cartItemId,
            quantity: itemQuantity - 1
          });
        }
      }
    }
  },
  filters: {
    parsedColorValue(jsonObject) {
      return JSON.parse(jsonObject).color;
    },
    parsedSizeValue(jsonObject) {
      return JSON.parse(jsonObject).size;
    }
  },
  props: {
    displayStatus: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
a {
  font-weight: 700;
}
</style>
