<template lang="pug">
  section.invoice
    .invoice__header
      nav.invoice__title.text-primary.h3.text-center {{ invoiceDetail.invNum }}
      .invoice__subtitle.text-sm.text-center {{ invoiceDetail.sellerName }}
    .invoice__main
      .detail
        .form-group.text-sm
          .form-label.text-sm 交易時間
          span {{ invoiceDetail.time }}
        .form-group.text-sm
          .form-label.text-sm 載具名稱
          span {{ carrierName }}
        .form-group.text-sm
          .form-label.text-sm 消費明細
          .columns.item(
            v-for="item in invoiceDetail.details"
            :key="item.rowNum"
          )
            .column.col-6.item__name {{ item.description }}
            .column.col-3.text-right.gray x{{ item.quantity }}
            .column.col-3.text-right $ {{ item.subtotal }}
          .columns.item
            .column.col-7
            .column.col-5.text-right 合計 ${{ invoiceDetail.amount }}元
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'invoice_Detail',
  computed: {
    ...mapGetters('invoice', ['invoiceDetail']),
    ...mapState({
      carrierName: state => state.phonecode.carrierName,
      errorCode: state => state.invoice.apiError.errorCode,
      message: state => state.invoice.apiError.message,
    }),
  },
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
