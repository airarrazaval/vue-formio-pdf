<template>
  <div>
      <label :for="id">{{ label }}</label>
      <span :id="id">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextAreaRender',
  data() {
    return {};
  },
  methods: {},
  props: ['id', 'label', 'value']
};
</script>

<style lang="scss" scoped>

</style>
