<template>
    <div class="row" v-if="show">
      <div class="col-sm-12">
        <h6>{{ component.legend }}</h6>
      </div>
    </div>
</template>

<script>
export default {
  name: 'formio-fieldset',
  data() {
    return {};
  },
  methods: {

  },
  computed: {
    show () {
      return !!( !this.component.hideLabel || this.component.label )
    }
  },
  props: [ 'component', 'options', 'parent' ]
};
</script>

<style lang="scss" scoped>
h6 {
  background: #ddd;
  padding: 5px;
  color: black;
  font-weight: bold;
}

</style>
