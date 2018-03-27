<template>
    <div class="form-horizontal" :class="{ 'bordered': bordered }">
        <div class="form-group">
            <label v-if="!hideLabel" :for="component.key" class="col-sm-4 control-label"><strong>{{ component.label }}</strong></label>
            <div :class="{'col-sm-8': !hideLabel, 'col-sm-12': hideLabel}">
              <span :id="component.key" class="form-control">
                {{ component.prefix || '$' }}{{ value.toLocaleString() }} {{ component.suffix }}
              </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'formio-currency',
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
    getValue () {
      return this.value ? this.value.toLocaleString() : '-'
    }
  },
  props: [ 'component', 'value', 'options', 'parent' ]
};
</script>

<style lang="scss" scoped>
$font-size: 10px;

div.form-group {
  margin-bottom: 0;
}

label {
  text-align: left !important;
}
span.form-control, label {
  font-size: $font-size;
  box-shadow: none;
  border: none;
  height: auto;
  background: transparent;
}
.bordered {
  border-top: 1px solid #ddd;
  margin-top: 4px;
}
</style>
