<template>
  <div>
    <div v-for="component in components" :key="component.key" v-if="show(component)">
      <formio-html v-if="component.type === 'htmlelement'" :component="component" :parent="parent"/>
      <formio-fieldset v-else-if="component.type === 'fieldset'" :component="component" :parent="parent"/>
      <div v-else-if="component.type === 'panel'" class="panel" :class="getPanelClass(component)" >
        <div class="panel-heading">
          {{ component.title }}
        </div>
        <div class="panel-body">
          <formio-container :components="component.components" :data="getData(component)" :options="getOptions(options)" :parent="parent"/>
        </div>
      </div>

      <formio-container v-if="isContainer(component)" :components="component.components" :data="getData(component)" :parent="parent"/>
      <formio-number v-else-if="component.type === 'number'" :component="component" :value="getValue(component, data)" :options="getOptions(options)" :parent="parent" />
      <formio-currency v-else-if="component.type === 'currency'" :component="component" :value="getValue(component, data)" :options="getOptions(options)" :parent="parent"/>
      <formio-text v-else-if="component.type === 'textarea' || component.type === 'textfield'" :component="component" :value="getValue(component, data)" :options="getOptions(options)" :parent="parent"/>
      <formio-select v-else-if="component.type === 'select'" :component="component" :value="getValue(component, data)" :options="getOptions(options)" :parent="parent"/>
      <formio-radio v-else-if="component.type === 'radio'" :component="component" :value="getValue(component, data)" :options="getOptions(options)" :parent="parent"/>
      <formio-selectboxes v-else-if="component.type === 'selectboxes'" :component="component" :values="getValue(component, data)" :options="getOptions(options)" :parent="parent"/>
      <formio-survey v-else-if="component.type === 'survey'" :component="component" :values="getValue(component, data)" :options="getOptions(options)" :parent="parent"/>
      
      <div v-else-if="component.type === 'table'">
        <table class="table table-condensed" :class="{'table-bordered': component.bordered, 'table-striped': component.striped}">
          <tbody>
            <tr v-for="row in component.numRows" :key="row">
              <td v-for="col in component.numCols" :key="col">
                <formio-container :components="component.rows[row-1][col-1].components || []" :data="getData(component.rows[row-1][col-1])" :options="getOptions(options,{bordered: false})" :parent="component"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="isGridComponent(component)">
        <label v-if="component.label && !component.hideLabel">{{ component.label }}</label>
        <table class="table table-condensed" :class="{'table-bordered': component.bordered, 'table-striped': component.striped}">
          <thead v-if="getGridNumRows(component) > getGridNumCols(component)">
            <tr>
              <th v-for="column in component.components" :key="column.key">{{ column.label }}</th>
            </tr>
          </thead>
          <tbody v-if="getGridNumRows(component) > getGridNumCols(component)">
            <tr v-for="i in getGridNumRows(component)" :key="i">
              <td v-for="column in component.components" :key="column.key">
                <formio-container :components="[ column ]" :data="getGridData(component, column, i - 1)" :options="getOptions(options,{bordered: false})" :parent="component"/>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="column in component.components" :key="column.key">
              <th>{{ column.label }}</th>
              <td v-for="i in getGridNumRows(component)" :key="i">
                <formio-container :components="[ column ]" :data="getGridData(component, column, i - 1)" :options="getOptions(options,{bordered: false})" :parent="component"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>




    </div>
  </div> 
</template>

<script>
import FormioUtils from 'formiojs/utils'

export default {
  name: 'formio-container',
  data () {
    return {
      skip: ['button']
    }
  },
  props: [ 'components', 'data', 'options', 'parent' ],
  methods: {
    show (component) {
      if (component.type == 'button' || component.type == 'hidden' || component.hidden) {
        return false
      }
      return true
    },
    isInputComponent (component) {
      return component.input && !component.tree
    },
    isGridComponent (component) {
      return component.type === 'datagrid' || component.type === 'editgrid'
    },
    isTableComponent (component) {
      return component.type === 'table'
    },
    isLayoutComponent (component) {
      return FormioUtils.isLayoutComponent(component)
    },
    isContainer(component) {
      return ['container', 'fieldset'].indexOf(component.type) >= 0
    },
    getValue (component, index) {
      let value = this.data[component.key]
      return (value && value.constructor === Array) ? value[index] : value
    },
    getData (component) {
      if (component.key in this.data) {
        return this.data[component.key]
      }
      return this.data
    },
    getGridData (parent, child, index) {
      let data = {}
      data[child.key] = this.data[parent.key][index][child.key]
      return data
    },
    getGridNumRows (component) {
      let rows = this.data[component.key] ? this.data[component.key].length : 0
      return rows
    },
    getGridNumCols (component) {
      let cols = component.components ? component.components.length : 0
      return cols
    },
    getPanelClass (component) {
      if (component.type === 'panel') {
        return 'panel-'.concat(component.theme || 'default')
      }
      return ''
    },
    getOptions (options = {bordered: true}, obj = {}) {
      if (Object.keys(obj).length === 0) {
        return options
      }
      for (let key in obj) {
        options[key] = obj[key]
      }
      return options
    },
    debug (obj, key = 'DEBUG-MSG') {
      console.log(key, obj)
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
table {
  font-size: 10px;
}

div.panel {
  overflow: hidden;
}

label {
  font-size: 10px;
}

</style>
