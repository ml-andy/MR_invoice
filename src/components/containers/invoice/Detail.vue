<template lang="pug">
  section.invoice
    .invoice__header
      nav.invoice__title.text-primary.h3.text-center
        |MN82386990
      .invoice__subtitle.text-sm.text-center Costco好市多內湖店
    .invoice__main
      .detail
        .form-group.text-sm
          .form-label.text-sm 交易時間
          span 108-01-20 13:09:02
        .form-group.text-sm
          .form-label.text-sm 載具名稱
          span 信用卡-koko
        .form-group.text-sm
          .form-label.text-sm 消費明細
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-6.item__name 五月花衛生紙10包超值優惠組合
            .column.col-3.text-right.gray x9999.9
            .column.col-3.text-right $ 999,992
          .columns.item
            .column.col-7
            .column.col-5.text-right 合計 $3,999元
</template>

<script>
export default {
  name: 'invoice_Detail',
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.h3 {
  line-height: $fontSize3;
}

.detail {
  min-height: calc(100vh - #{convertUnit(82)});
  background-color: $light-color;
  padding: #{convertUnit(25)} #{convertUnit(20)};
}

.item {
  padding: #{convertUnit(10)} 0;
  border-bottom: 1px solid $gray-color;

  &:last-child { border-bottom: 0; }
}

.columns {
  .column {
    padding: 0;

    &.item__name {
      padding: 0 #{convertUnit(5)};
      line-height: $fontSize4;
    }
    &.gray { color: $gray-color-dark; }
  }
}

.form {
  &-group {
    margin-bottom: convertUnit(15);
  }
  &-label {
    color: $gray-color-dark;
  }
}

.invoice__main {
  padding-bottom: 0;
}
</style>
