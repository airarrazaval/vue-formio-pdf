<template>
  <div>
    <h3 v-if="!grid.title">{{ grid.title }}</h3>
    <table class="table table-striped" v-if="!transpose">
      <thead>
        <tr>
          <th v-for="component in grid.components" :key="component">{{ component.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in grid.rows" :key="row">
          <td v-for="(value, key) in row" :key="key">
            <span v-if="isComponentInput(key)">{{ value }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table table-striped" v-else>
      <tbody>
        <tr v-for="column in grid.components" :key="column">
          <th>{{ column.label }}</th>
          <td v-for="value in getComponentValues(column.key)" :key="value">
            <span v-if="isComponentInput(column.key)">{{ value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script>
import FormioUtils from 'formiojs/utils'

export default {
  data() {
    return {
      
    };
  },
  methods: {
    getComponentType (key) {
      let component = FormioUtils.getComponent(this.grid.components, key)
      return component.type
    },
    getComponentLabel (key) {
      let component = FormioUtils.getComponent(this.grid.components, key)
      return component.label
    },
    isComponentInput (key) {
      let component = FormioUtils.getComponent(this.grid.components, key)
      return component.input
    },
    getComponentValues (key) {
      return this.grid.rows.map(x => x[key])
    }
  },
  props: [ 'id', 'grid' ],
  computed: {
    transpose: function () {
      return (this.grid.rows.length < Object.keys(this.grid.rows[0]).length && Object.keys(this.grid.rows[0]).length > 5)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
