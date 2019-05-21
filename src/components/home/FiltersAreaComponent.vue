<template>
  <section class="filters-area">
    <div class="filters-area__infos">
      <h3 class="filters-area__main-title">Filter {{count}} {{count > 1 ? 'items' : 'item'}}</h3>
      <span class="filters-area__department" v-if="Object.keys(selectedDepartment).length > 0">
        <a @click="closeFilter('department')" class="close" style="margin-right: 3px">
          <img src="@/assets/img/closeblack.svg" alt="Close icon">
        </a>&nbsp;Department:
        <span class="primary-color">{{selectedDepartment.name}}</span>
      </span>
      <br v-if="Object.keys(selectedDepartment).length > 0">
      <span class="filters-area__category" v-if="Object.keys(selectedCategory).length > 0">
        <a @click="closeFilter('category')" class="close" style="margin-right: 3px">
          <img src="@/assets/img/closeblack.svg" alt="Close icon">
        </a>&nbsp;Category:
        <span class="primary-color">{{selectedCategory.name}}</span>
      </span>
    </div>
    <div class="filters-area__filterselection">
      <div class="department__filter">
        <h3 class="filters-area__title">Departments</h3>
        <ul class="filters-area__departments">
          <li :class="{selected__item: selectedDepartment.name==department.name}" @click="selectCurrentDepartment(department)" class="filters-area__departments filters-area__department-item" :key="department.department_id" v-for="department in departments">
            <a>{{department.name}}</a>
          </li>
        </ul>
      </div>
      <div class="category__filter">
        <h3 class="filters-area__title">Categories</h3>
        <ul class="filters-area__categories">
          <li :class="{selected__item: selectedCategory.name==category.name}" @click="selectCurrentCategory(category)" class="filters-area__categories filters-area__category" :key="category.category_id" v-for="category in categories">
            <a>{{category.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  props: ['count'],
  data () {
    return {
      selectedDepartment: {},
      selectedCategory: {}
    } 
  },
  computed: {
    departments () {
      return this.$store.state.departments.departments
    },
    categories () {
      return this.$store.state.categories.categories
    }
  },
  methods: {
    selectCurrentDepartment (depObj) {
      this.selectedCategory = {}
      Event.$emit('selectedDep', depObj.name)
      this.selectedDepartment = depObj;
      this.$store.dispatch('fetchProductsByDepartment', { id: this.selectedDepartment.department_id, pageNumber: 1 })
      this.$emit('departmentMode', this.selectedDepartment.department_id)
    },
    selectCurrentCategory (catObj) {
      this.selectedDepartment = {}
      this.selectedCategory = catObj;
      Event.$emit('filterClosed')
      this.$store.dispatch('fetchProductsByCategory', { id: this.selectedCategory.category_id, pageNumber: 1 })
      this.$emit('categoryMode', this.selectedCategory.category_id)
    },
    closeFilter (type) {
      if (type === 'department') {
        this.selectedDepartment = {}
        Event.$emit('filterClosed')
      } else if (type === 'category') {
        this.selectedCategory = {}
      }
      this.$store.dispatch('fetchProducts'); 
      this.$emit('normalMode');
    }
  },
  created () {
    Event.$on('normalMode', () => {
      this.selectedDepartment = {}
      this.selectedCategory = {}
    })
    Event.$on('depSelected', depObj =>{
      this.selectedCategory = {}
      this.selectedDepartment = depObj
      this.$store.dispatch('fetchProductsByDepartment', { id: this.selectedDepartment.department_id, pageNumber: 1 })
      this.$emit('departmentMode', this.selectedDepartment.department_id)
    })
  }
}
</script>

<style>
  
</style>
