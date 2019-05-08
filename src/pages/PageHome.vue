<template>
  <div v-if="asyncDataStatus_ready">
    <main class="all-products" style="opacity: 1">
      <FiltersArea :count="products.count"/>
      <AppLoadingComponent v-show="loadingState"/>
      <section class="products-area">
        <ProductCarousel :currentPageNumber="currentPageNumber" 
        :totalPages="totalPages"
        @pageClicked="changePageNumber"
        @incrementPage="incrementPage()" 
        @decrementPage="decrementPage()"/>
        <ProductList :products="products.products" v-show="!loadingState"/>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters, mapActions} from 'vuex'
import AppLoadingComponent from '@/components/AppLoadingComponent.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import FiltersArea from '@/components/FiltersAreaComponent.vue'
import ProductList from '@/components/ProductList.vue'
import ProductCarousel from '@/components/ProductCarousel.vue'
export default {
  mixins: [asyncDataStatus],
  data () {
    return {
      currentPageNumber: 0,
      productsPerPage: 15,
    }
  },
  components: {
    ProductList,
    ProductCarousel,
    FiltersArea,
    AppLoadingComponent
  },
  computed: {
    ...mapGetters({
      products: 'allProducts',
      loadingState: 'getLoadingState'
    }),
    totalPages () {
      return Math.ceil(this.products.count / this.productsPerPage)
    },
  },
  methods: {
    incrementPage () {
      this.currentPageNumber++
      this.$store.dispatch('fetchProducts', this.currentPageNumber+1)
    },
    decrementPage () {
      this.currentPageNumber--
      this.$store.dispatch('fetchProducts', this.currentPageNumber+1)
    },
    changePageNumber (pageNumber) {
      this.currentPageNumber = pageNumber
      this.$store.dispatch('fetchProducts', this.currentPageNumber+1)
    },
    ...mapActions([
      'fetchProducts'
    ])
  },
  created () {
    this.fetchProducts()
    .then(() => {
      this.asyncDataStatusFetch()
    })
  }
}
</script>

<style lang="scss" scoped>
  span, p{
    font-weight: normal;
  }
  select{
    font-weight: 700;
  }
</style>
