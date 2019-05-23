<template>
  <section class="shopping__cart" :class="{'is__shopping': displayStatus}">
    <button class="shopping__cart-closebtn">
      <a>
        <img @click="$emit('closeLogout')" src="@/assets/img/closebtn.svg" alt="Close Button">
      </a>
    </button>
    <h1 class="shopping__cart-message" style="margin-top: 1rem">Do you want to save items in the cart ?</h1>
    <div class="shopping__cart-buttons">
      <div class="shopping__cart-buttonscontainer" style="justify-content: flex-end">
        <a @click="logout(false)" class="shopping__cart-button product__cart-btn btnghost" style="margin-right: 3rem">No</a>
        <a @click="logout(true)" class="shopping__cart-button product__cart-btn" style="font-weight: 700">Yes</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['displayStatus'],
  methods: {
    logout (response) {
      this.$store.dispatch('logOut', response)
      .then(() => {
        this.$emit('closeLogout')
        this.$router.push({ name: 'Home' })
      })
    }
  }
}
</script>

<style>

</style>
