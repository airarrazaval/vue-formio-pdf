<template>
  <div>
    <div class="form-horizontal" :class="{ 'bordered': !component.inDataGrid }">
      <div class="form-group">
        <div class="control-label col-sm-12">
          <label v-if="!hideLabel"><strong>{{ component.label }}</strong></label>
        </div>
      </div>
    </div>
    
    <div class="form-horizontal bordered" v-for="question in component.questions" :key="question.value" >
      <div class="form-group">
        <label :for="question.key" class="col-sm-4 control-label">{{ question.label }}</label>
        <div class="col-sm-8">
          <span :id="question.key" class="form-control">
            {{ getLabel(question) }}
          </span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'formio-survey',
  data() {
    return {};
  },
  computed: {
    hideLabel () {
      return this.component.hideLabel || this.component.inDataGrid || this.parent.type == 'datagrid' || this.parent.type == 'table'
    }
  },
  methods: {
    getLabel (question) {
      for (let i in this.component.values) {
        if (this.component.values[i].value === this.values[question.value]) {
          return this.component.values[i].label
        }
      }
      return '-'
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

h6 {
  font-size: 10px;
}
</style>
