<template>
  <div class="products-area__products">
    <ProductListItem :product="product" :key="product.product__id" v-for="product in products"/>
  </div>
</template>

<script>
import ProductListItem from '@/components/home/ProductListItem.vue'
export default {
  props: {
    products: {
      required: true
    }
  },
  components: {
    ProductListItem
  }
}
</script>

<style>
</style>
