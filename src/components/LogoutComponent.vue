<template>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('logOut')
      .then(() => this.$router.push({ name: 'Home' }))
  }
}
</script>
