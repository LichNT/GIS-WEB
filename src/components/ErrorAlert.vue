<template>
<div v-if="error" class="error-alert">
  <p>{{ error.message }}</p>
  <ul v-if="error.errors">
    <li v-for="error in error.errors">{{ error[0] }}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'error-alert',
  props: ['error']
}
</script>

<style lang="css" scoped>
.error-alert {
  padding: 5px 20px;
  background-color: #ff4949;
  margin: 10px;
  color: white;
}
</style>
