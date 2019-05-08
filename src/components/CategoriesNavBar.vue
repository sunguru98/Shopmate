<template>
  <nav class="categories__navbar topbar">
    <div class="container">
      <a href="#" style="display: flex"><img src="@/assets/img/logo.svg" alt="" class="categories__navbar-logo"></a>
      <ul class="categories__navbar-categories white-color">
        <li @click="departmentSelected(department.name)" :key="department.department_id" v-for="department in departments"><a>{{department.name}}</a></li>
      </ul>
      <form action="#" class="categories__navbar-search">
        <a href="#" style="display: flex"><img src="@/assets/img/search.svg" alt="Search Icon" class="search"></a>
        <input type="text" placeholder="search here (press enter)">
        <a href="#" class="close"><img src="@/assets/img/close.svg" alt="Close icon"></a>
      </form>
      <div class="categories__navbar-cart--notifications">
        <a href="" style="display: flex" @click.prevent="showCart"><img src="@/assets/img/cartwhite.svg" alt="Cart image" class="cart__image"></a>
        <span class="cart__badge">6</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['departments'],
  methods: {
    showCart () {
      this.$emit('cartClicked')
    },
    departmentSelected (depName) {
      Event.$emit('departmentSelected', depName)
    }
  }
}
</script>
