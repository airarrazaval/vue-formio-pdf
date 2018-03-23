<template>
  <div id="app" class="container">
    <AutoReport />
  </div>
</template>

<script>
import { AutoReport } from '@/views/reports'

export default {
  name: 'app',
  components: {
    AutoReport
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
