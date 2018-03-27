<template>
  <div id="report">
    <p class="text-center">
      <button @click="downloadPDF" class="btn btn-primary">Download</button>
    </p>
    <br />
    <form id="report-content" class="form-horizontal">
      <table class="table table-bordered table-condensed">
        <tbody>
          <tr>
            <td colspan="2">
              <h4 class="text-center">{{ form.title }}</h4>
            </td>
          </tr>
          <tr>
            <th class="text-right">submission id:</th>
            <td>{{ submissionId }}</td>
          </tr>
          <tr>
            <th class="text-right">submission date:</th>
            <td>{{ submissionDate }}</td>
          </tr>
        </tbody>
      </table>
      <formio-container :components="form.components" :data="data" :options="options" :parent="form"/>
    </form>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'
import FormioContainer from '@/components/Formio/FormioContainer.vue'
import { Data, Form } from '@/test'

export default {
  name: 'report',
  components: {
    FormioContainer
  },
  data() {
    return {
      options: {
        bordered: true
      }
    }
  },
  computed: {
    data () {
      return Data.data
    },
    form () {
      return Form
    },
    submissionDate () {
      let date = new Date(Data.modified)
      let tz = (date.getTimezoneOffset() < 0 ? 'GMT+' : 'GMT-').concat(date.getTimezoneOffset()/60*(-1))
      return date.toISOString().replace('T', ' ').split('.')[0].concat(' ', tz)
    },
    submissionId () {
      return Data._id
    }
  },
  methods: {
    downloadPDF() {
      html2pdf(document.getElementById('report-content'), {
        margin: 10,
        filename: 'assessment1.pdf',
        html2canvas: {
          dpi: 192,
          letterRendering: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'letter',
          orientation: 'portrait'
        }
      })
    }
  }
}



</script>

<style lang="scss" scoped>
#report {
  max-width: 600px;
  margin: auto;
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: hidden;
}

</style>
