<template>
  <div class="products-area__product">
      <div class="normal-view">
        <img :src="product.thumbnail" alt="Shirt image" class="products-area__product-image">
        <h2 class="products-area__product-name">{{product.name}}</h2>
        <h2 class="products-area__product-discountedprice primary-color">${{product.discounted_price == '0.00' ? product.price : product.discounted_price}}</h2>
        <span v-if="product.discounted_price != '0.00'" class="products-area__product-originalprice">$15.99</span>
      </div>
      <div class="hovered-view">
        <h3 class="product__title">{{product.name}}</h3>
        <h2 class="product__discountedprice primary-color">${{product.discounted_price == '0.00' ? product.price : product.discounted_price}}</h2>
        <div v-if="product.colors" class="product__colors">
          <div :key="color.attribute_value_id" :class="color.attribute_value.toLowerCase()" v-for="color in product.colors"></div>
        </div>
        <div class="product__decisions" v-if="product.sizes">
          <select name="size" class="product__sizes">
            <option value selected disabled>Size</option>
            <option :key="size.attribute_value_id" v-for="size in product.sizes" :value="size.attribute_value">{{size.attribute_value}}</option>
          </select>
          <button class="product__cart-btn">Add to Cart</button>
        </div>
        <a href="#" class="product__detail primary-color">
          <span>View more</span>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
