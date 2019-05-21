<template>
  <div v-if="asyncDataStatus_ready">
    <main class="all-products" style="opacity: 1">
      <FiltersArea :count="products.count" @normalMode='productsDisplayMode="all"; currentPageNumber=0' @departmentMode="productsDisplayMode='department';displayId=$event; currentPageNumber=0"
      @categoryMode="productsDisplayMode='category'; displayId=$event; currentPageNumber=0"/>
      <section class="products-area">
        <ProductCarousel :currentPageNumber="currentPageNumber" 
        :totalPages="totalPages"
        @pageClicked="changePageNumber"
        @incrementPage="incrementPage()" 
        @decrementPage="decrementPage()"/>
        <h1 style="text-align: center" v-if="totalPages === 0 && !loadingState">Sorry! No products under the given search</h1>
        <Spinner v-show="loadingState"/>
        <ProductList :products="products.products" v-show="!loadingState"/>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from 'vuex'
import Spinner from '@/components/common/AppLoadingComponent.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import FiltersArea from '@/components/home/FiltersAreaComponent.vue'
import ProductList from '@/components/home/ProductList.vue'
import ProductCarousel from '@/components/home/ProductCarousel.vue'
export default {
  mixins: [asyncDataStatus],
  data () {
    return {
      currentPageNumber: 0,
      productsPerPage: 15,
      productsDisplayMode: "all",
      displayId: null
    }
  },
  components: {
    ProductList,
    ProductCarousel,
    FiltersArea,
    Spinner
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
      this.checkProductsDisplayMode()
    },
    decrementPage () {
      this.currentPageNumber--
      this.checkProductsDisplayMode()
    },
    changePageNumber (pageNumber) {
      this.currentPageNumber = pageNumber
      this.checkProductsDisplayMode()
    },
    checkProductsDisplayMode () {
      if (this.productsDisplayMode === "all") {
        this.$store.dispatch('fetchProducts', this.currentPageNumber+1)
      } else if (this.productsDisplayMode === "department") {
        this.$store.dispatch('fetchProductsByDepartment', { id: this.displayId, pageNumber: this.currentPageNumber+1 })
      } else if (this.productsDisplayMode === "category") {
        this.$store.dispatch('fetchProductsByCategory', { id: this.displayId, pageNumber: this.currentPageNumber+1 })
      }
    }
  },
  created () {
    Event.$on('normalMode', () => {
      this.productsDisplayMode = "all"
    })
    this.$store.dispatch('fetchProducts')
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
</style>
