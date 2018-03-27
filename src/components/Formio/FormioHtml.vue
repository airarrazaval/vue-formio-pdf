<template>
    <div :id="component.key" class="formio-html" v-html="html" v-if="show">
    </div>
</template>

<script>
export default {
  name: 'formio-html',
  data() {
    return {};
  },
  computed: {
    show () {
      let html = document.createElement('div')
      html.innerHTML = this.html
      return !this.hidden && html.innerText
    },
    html () {
      let container = document.createElement('div')
      let html = document.createElement(this.component.tag)
      html.innerHTML = this.component.content
      container.appendChild(html)
      return container.innerHTML
    }
  },
  methods: {
  },
  props: [ 'component', 'value', 'options', 'parent' ]
};
</script>

<style lang="scss" scoped>
.formio-html {
  font-size: 10px;
}
</style>
