<template>
    <div class="form-horizontal">
        <div class="form-group">
            <label :for="id" class="col-sm-4 control-label"><strong>{{ label }}</strong></label>
            <div class="col-sm-8">
              <span :id="id" class="form-control">${{ value.toLocaleString() }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  props: [ 'id', 'label', 'value' ]
};
</script>

<style lang="scss" scoped>

</style>
