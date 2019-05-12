<template>
  <nav class="categories__navbar topbar">
    <div class="container">
      <router-link style="display: flex" :to="{name: 'Home'}"><img src="@/assets/img/logo.svg" alt="" class="categories__navbar-logo"></router-link>
      <ul class="categories__navbar-categories white-color">
        <li @click="departmentSelected(department)" :key="department.department_id" v-for="department in departments"><a>{{department.name}}</a></li>
      </ul>
      <div action="#" class="categories__navbar-search">
        <a @click.prevent="searchProducts" style="display: flex"><img src="@/assets/img/search.svg" alt="Search Icon" class="search"></a>
        <input @keypress.enter="searchProducts" type="text" placeholder="search here (press enter)" v-model="searchQuery">
        <a @click.prevent="searchQuery=''" class="close"><img src="@/assets/img/close.svg" alt="Close icon"></a>
      </div>
      <div class="categories__navbar-cart--notifications">
        <a href="" style="display: flex" @click.prevent="showCart"><img src="@/assets/img/cartwhite.svg" alt="Cart image" class="cart__image"></a>
        <span class="cart__badge" v-if="cartItems.length > 0">{{cartItems.length}}</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['departments'],
  data () {
    return {
      searchQuery: ''
    }
  },
  computed: {
    cartItems () {
      return this.$store.getters.getShoppingCartItems
    }
  },
  methods: {
    showCart () {
      this.$emit('cartClicked')
    },
    searchProducts () {
      if(this.$route.name !== "Home"){
        this.$router.push({name: 'Home'})
      }
      this.$store.dispatch('fetchProductsBySearch', this.searchQuery)
    },
    departmentSelected (depObj) {
      Event.$emit('depSelected', depObj)
    }
  }
}
</script>
