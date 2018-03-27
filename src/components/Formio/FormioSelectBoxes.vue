<template>
    <div class="form-horizontal" :class="{'bordered' : bordered}">
        <div class="form-group">
            <label v-if="!hideLabel" :for="component.key" class="col-sm-4 control-label"><strong>{{ component.label }}</strong></label>
            <div :class="{'col-sm-8': !hideLabel, 'col-sm-12': hideLabel }">
              <span :id="component.key" class="form-control">
                <div class="checkbox" v-for="item in component.values" :key="item.value">
                  <label>
                    <span class="glyphicon" :class="{'glyphicon-check': selected(item), 'glyphicon-unchecked': !selected(item)}"></span>
                    {{ item.label }}
                  </label>
                </div>
              </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'formio-selectboxes',
  data() {
    return {};
  },
  computed: {
    hideLabel () {
      return this.component.hideLabel || this.component.inDataGrid || this.parent.type == 'datagrid' || this.parent.type == 'table'
    },
    bordered () {
      return this.options ? this.options.bordered : true
    }
  },
  methods: {
    selected (item) {
      for (let value in this.values) {
        if (item.value === value) {
          return true
        }
      }
      return false
    }
  },
  props: [ 'component', 'values', 'options', 'parent' ]
};
</script>

<style lang="scss" scoped>
$font-size: 10px;

div.form-group {
  margin-bottom: 0;
  height: auto;
}

label {
  text-align: left !important;
}
span.form-control, label {
  font-size: $font-size;
  box-shadow: none;
  border: none;
  height: auto !important;
  background: transparent;
}

.bordered {
  border-top: 1px solid #ddd;
  margin-top: 4px;
}
</style>
