import Vue from 'vue'
import App from '@/App.vue'
import '@/assets/styles/site.scss'

import FormioHtml from '@/components/Formio/FormioHtml.vue'
import FormioNumber from '@/components/Formio/FormioNumber.vue'
import FormioCurrency from '@/components/Formio/FormioCurrency.vue'
import FormioText from '@/components/Formio/FormioText.vue'
import FormioRadio from '@/components/Formio/FormioRadio.vue'
import FormioSurvey from '@/components/Formio/FormioSurvey.vue'
import FormioSelect from '@/components/Formio/FormioSelect.vue'
import FormioSelectBoxes from '@/components/Formio/FormioSelectBoxes.vue'
import FormioFieldSet from '@/components/Formio/FormioFieldSet.vue'
import FormioContainer from '@/components/Formio/FormioContainer.vue'
import Report from '@/components/Report.vue'

Vue.config.productionTip = false

Vue.component('formio-html', FormioHtml)
Vue.component('formio-number', FormioNumber)
Vue.component('formio-currency', FormioCurrency)
Vue.component('formio-text', FormioText)
Vue.component('formio-radio', FormioRadio)
Vue.component('formio-survey', FormioSurvey)
Vue.component('formio-select', FormioSelect)
Vue.component('formio-selectboxes', FormioSelectBoxes)
Vue.component('formio-fieldset', FormioFieldSet)
Vue.component('formio-container', FormioContainer)

Vue.component('report', Report)

new Vue({
  render: h => h(App)
}).$mount('#app')
