<template>
  <div id="report">
    
    <form id="report-content" class="form-horizontal">
      <h1 class="text-center">{{ form.title }}</h1>
      <hr/>
      <div v-for="(value, key) in data" :key="key" v-if="isComponentInput(key) && getComponentType(key) !== 'button'">
        <div v-if="getComponentType(key) === 'textfield'">
          <r-textfield :id="key" :label="getComponentLabel(key)" :value="value" isInline="true" />
        </div>
        <div v-else-if="getComponentType(key) === 'number'">
          <r-number :id="key" :label="getComponentLabel(key)" :value="value" />
        </div>
        <div v-else-if="getComponentType(key) === 'currency'">
          <r-currency :id="key" :label="getComponentLabel(key)" :value="value" />
        </div>
        <div v-else-if="getComponentType(key) === 'datagrid'" class="datagrid">
          <r-datagrid :id="key" :grid="{ 'components': getComponents(key), 'rows': value, 'title': getComponentLabel(key)}" />
        </div>
      </div>
    </form>
    <button @click="downloadPDF" class="btn btn-primary">Download</button>
  </div>
</template>

<script>
import FormioUtils from 'formiojs/utils'
import html2pdf from 'html2pdf.js'
//import '@/assets/styles/report.scss'

import {
  CurrencyRender,
  DataGridRender,
  TextFieldRender,
  TextAreaRender,
  NumberRender
} from '@/utils/render'

import { Data, Form } from '@/utils/test'

export default {
  components: {
    'r-currency': CurrencyRender,
    'r-datagrid': DataGridRender,
    'r-number': NumberRender,
    'r-textfield': TextFieldRender,
    'r-textarea': TextAreaRender
  },
  data () {
    return {

    }
  },
  computed: {
    data: function () {
      return Data.data
    },
    form: function () {
      return Form
    }
  },
  methods: {
    getComponentType (key) {
      let component = FormioUtils.getComponent(this.form.components, key)
      return component.type
    },
    getComponentLabel (key) {
      let component = FormioUtils.getComponent(this.form.components, key)
      return component.label
    },
    getComponents (key) {
      let component = FormioUtils.getComponent(this.form.components, key)
      // console.log(this.data[key])
      // console.log(component.components)
      return component.components
    },
    isComponentInput (key) {
      let component = FormioUtils.getComponent(this.form.components, key)
      return component.input
    },
    downloadPDF () {
      console.log('rendering html2pdf...')
      html2pdf(document.getElementById('report-content'), {
        margin: 10,
        filename: 'assessment1.pdf',
        html2canvas: {dpi: 192, letterRendering: true},
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait'}
      })
    }
  }
}

</script>

<style lang="scss">
@import '../../assets/styles/report.scss';


</style>
