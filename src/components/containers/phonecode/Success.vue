<template lang="pug">
  section.phonecode.stepbarSpace
    .section__header.footerSpace
      p.success.text-center
        i.icon.icon-success
      h3.text-primary.text-center 綁定成功！
    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        @click="onSubmit"
      ) 查詢發票明細
</template>

<script>
import * as routePath from '@/constant/routePath';

export default {
  name: 'phonecodeUpdateSuccess',
  methods: {
    onSubmit() {
      this.$router.push(routePath.INVOICE);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.phonecode {
  padding-left: $space;
  padding-right: $space;

  .success {
    font-size: convertUnit(110);
    line-height: convertUnit(110);
  }
}
</style>
