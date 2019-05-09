<template>
  <div class="products-area__carousel">
    <button v-if="currentPageNumber !== 0" @click.prevent="decrementPage" style="cursor: pointer; display: flex; border:none; outline: none">
      <img src="@/assets/img/larrow.svg" alt="Left arrow icon" class="previous-products">
    </button>
    <ul class="page__numbers">
      <li 
      @click="pageClicked($event)" 
      :class="{selected__page: currentPageNumber+1 === page}" 
      :data-pagenumber="page" :key="page" 
      v-for="page in totalPages">
        <a>{{page}}</a>
      </li>
    </ul>
    <button v-if="currentPageNumber+1 !== totalPages && totalPages!==0" @click.prevent="incrementPage" style="cursor: pointer; display: flex; border:none; outline: none">
      <img src="@/assets/img/rarrow.svg" alt="Right arrow icon" class="next-products">
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPageNumber: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    incrementPage () {
      this.$emit('incrementPage')
    },
    pageClicked (e) {
      this.$emit('pageClicked', e.target.closest('li').dataset.pagenumber-1)
    },
    decrementPage () {
      this.$emit('decrementPage')
    }
  }
}
</script>

<style>
</style>
