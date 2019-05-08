<template>
  <nav class="categories__navbar topbar">
    <div class="container">
      <a href="#" style="display: flex"><img src="@/assets/img/logo.svg" alt="" class="categories__navbar-logo"></a>
      <ul class="categories__navbar-categories white-color">
        <li><a href="#">Regional</a></li>
        <li><a href="#">Nature</a></li>
        <li><a href="#">Kids</a></li>
      </ul>
      <form action="#" class="categories__navbar-search">
        <a href="#" style="display: flex"><img src="@/assets/img/search.svg" alt="Search Icon" class="search"></a>
        <input type="text" placeholder="search anything">
        <a href="#" class="close"><img src="@/assets/img/close.svg" alt="Close icon"></a>
      </form>
      <div class="categories__navbar-cart--notifications">
        <a href="" style="display: flex"><img src="@/assets/img/cartwhite.svg" alt="Cart image" class="cart__image"></a>
        <span class="cart__badge">6</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

