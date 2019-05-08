<template>
  <section class="filters-area">
    <div class="filters-area__infos">
      <h3 class="filters-area__main-title">Filter {{count}} items</h3>
      <span class="filters-area__department" v-if="selectedDepartment">
        <a @click="selectedDepartment=null; selectedCategory=null" class="close" style="margin-right: 3px">
          <img src="@/assets/img/closeblack.svg" alt="Close icon">
        </a>&nbsp;Department:
        <span class="primary-color">{{selectedDepartment}}</span>
      </span>
      <br v-if="selectedDepartment">
      <span class="filters-area__category" v-if="selectedCategory">
        <a @click="selectedCategory=null" class="close" style="margin-right: 3px">
          <img src="@/assets/img/closeblack.svg" alt="Close icon">
        </a>&nbsp;Category:
        <span class="primary-color">{{selectedCategory}}</span>
      </span>
    </div>
    <div class="filters-area__filterselection">
      <div class="department__filter">
        <h3 class="filters-area__title">Departments</h3>
        <ul class="filters-area__departments">
          <li :class="{selected__item: selectedDepartment==department.name}" @click="selectCurrentDepartment(department.name)" class="filters-area__departments filters-area__department-item" :key="department.department_id" v-for="department in departments">
            <a>{{department.name}}</a>
          </li>
        </ul>
      </div>
      <div class="category__filter">
        <h3 class="filters-area__title">Categories</h3>
        <ul class="filters-area__categories">
          <li :class="{selected__item: selectedCategory==category.name}" @click="selectCurrentCategory(category.name)" class="filters-area__categories filters-area__category" :key="category.category_id" v-for="category in categories">
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
      selectedDepartment: null,
      selectedCategory: null
    } 
  },
  computed: {
    ...mapState([
      'departments',
      'categories'
    ])
  },
  methods: {
    selectCurrentDepartment (depName) {
      this.selectedDepartment = depName;
      Event.$emit('depSelected', this.selectedDepartment)
    },
    selectCurrentCategory (catName) {
      this.selectedCategory = catName;
      Event.$emit('catSelected', this.selectedCategory)
    }
  },
  created () {
    Event.$on('departmentSelected', departmentName =>{
      this.selectedDepartment = departmentName
    })
  }
}
</script>

<style>
  
</style>
