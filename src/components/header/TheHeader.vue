<template>
  <header class="nav-bars">
    <GeneralNavBar @cartClicked="activateCart"/>
    <CategoriesNavBar @cartClicked="activateCart" :departments="departments"/>
  </header>
</template>

<script>
import CategoriesNavBar from '@/components/header/CategoriesNavBar.vue'
import GeneralNavBar from '@/components/header/GeneralNavBar.vue'
export default {
  props: ['departments'],
  components: {
    CategoriesNavBar, GeneralNavBar
  },
  methods: {
    activateCart () {
      this.$emit('displayCart')
    }
  }
}
</script>
