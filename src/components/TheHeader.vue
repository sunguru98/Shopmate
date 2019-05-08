<template>
  <header class="nav-bars">
    <GeneralNavBar/>
    <CategoriesNavBar/>
  </header>
</template>

<script>
import CategoriesNavBar from '@/components/CategoriesNavBar.vue'
import GeneralNavBar from '@/components/GeneralNavBar.vue'
export default {
  components:{
    CategoriesNavBar, GeneralNavBar
  }
}
</script>

