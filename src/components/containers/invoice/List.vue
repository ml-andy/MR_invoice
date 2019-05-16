<template lang="pug">
  section.invoice
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    .invoice__header
      nav.invoice__title
        .columns
          .column.col-2
          .column.col-8
            .columns
              .column.col-2.text-sm.text-right.titledate
                a.prev.text-sm(
                  v-show="activeIndex > 0"
                  href="javascript:;"
                )
                  .icon.icon-caret.icon-caret-left
              .column.col-8.text-sm.text-center.titledate
                |{{ date.year }}年{{ date.month }}月
              .column.col-2.text-sm.titledate
                a.next.text-sm(
                  v-show="activeIndex + 1 < invoices.length"
                  href="javascript:;"
                )
                  .icon.icon-caret.icon-caret-right
          .column.col-2
      .invoice__subtitle.text-sm.text-center 共有 {{ invoices[activeIndex].list.length }} 張發票
    .invoice__main
      swiper(
        :options="swiperOption"
        ref="mySwiper"
      )
        swiper-slide(
          v-for="invoice in invoices"
          :key="invoice.month"
        )
          .invoice__empty.empty(v-if="invoice.list.length === 0 && invoice.isFetch")
            .empty__photo
              i.icon.icon-noReciept
            p.text.text-center 目前尚無任何發票資料！
          .list(v-else)
            .list__item(
              v-for="item in invoice.list"
              :key="item.month"
              @click="onDetail(item)"
            )
              .columns
                .column.col-8.name
                  span.text-sm.text-secondary.date
                    |{{ item.invMonth | addZero }}/{{ item.invDay | addZero }}
                  span.text-sm {{ item.invNum }}
                  p.h5 {{ item.sellerName | textLen }}
                .column.col-4.amount
                  .columns
                    .column.col-10.text-right
                      span.h4.text-primary $ {{ item.amount }}
                    .column.col-2.h4.text-right
                      i.icon.icon-arrow
    .invoice__footer
      a.noticeBtn.text-sm(
        href="javascript:;"
        @click="onEditNoticeModal(true)"
      )
        i.icon.icon-info.icon-margin-right
        |注意事項
</template>

<script>
import * as routePath from '@/constant/routePath';
import { mapState, mapActions, mapMutations } from 'vuex';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NoticeModal from '@/components/containers/invoice/NoticeModal';
import { addZero, textLen, sendMixpanel } from '@/helpers/unit';

export default {
  name: 'invoice_list',
  data() {
    return {
      swiperOption: {
        autoHeight: true,
        initialSlide: 2,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        },
      },
      date: {
        year: '',
        month: '',
      },
      isNotice: false,
    };
  },
  computed: {
    ...mapState({
      invoices: state => state.invoice.invoices,
      activeIndex: state => state.invoice.invoicesIndex,
      errorCode: state => state.invoice.apiError.errorCode,
      message: state => state.invoice.apiError.message,
      carrierName: state => state.phonecode.carrierName,
    }),
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  created() {
    this.initApiError();
    this.initInvoice();
    this.swiperOption.initialSlide = this.activeIndex;
  },
  mounted() {
    this.swiper.on('slideChange', this.onSlideChange);
    this.onSlideChange();
  },
  filters: {
    textLen: value => textLen(value, 10, '...'),
    addZero: value => addZero(value),
  },
  methods: {
    ...mapActions('invoice', ['getInvoiceList', 'getInvoiceDetail']),
    ...mapMutations('invoice', ['initApiError', 'fetchState', 'initInvoice']),
    onEditNoticeModal(visible) {
      this.isNotice = visible;
    },
    async onDetail(item) {
      const {
        invNum,
        invYear,
        invMonth,
        invDay,
        amount,
        sellerName,
      } = item;
      const invDate = `${(invYear * 1) + 1911}/${invMonth}/${invDay}`;
      await this.getInvoiceDetail({
        invNum,
        invDate,
        sellerName,
        amount,
      });

      if (this.errorCode === '') {
        sendMixpanel('eReceipt_detail_click', {
          tag: 'success',
        });
        this.$router.push(routePath.INVOICE_DETAIL);
      } else {
        sendMixpanel('eReceipt_detail_click', {
          tag: this.message,
        });
      }
    },
    onSlideChange() {
      const activeIndex = this.$refs.mySwiper.swiper.activeIndex || 0;
      const { year, month, isFetch } = this.invoices[activeIndex];
      this.date = { year, month };
      this.fetchState({
        key: 'invoicesIndex',
        value: activeIndex,
      });
      sendMixpanel('eReceipt_list_view', {
        cards_type: this.carrierName,
      });

      if (isFetch) return;
      this.getInvoiceList(activeIndex);
    },
  },
  components: {
    swiper,
    swiperSlide,
    NoticeModal,
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.titledate {
  line-height: $fontSize3;
}

.swiper-slide {
  background-color: $light-color;

  .list {
    min-height: 100vh;

    &__item {
      padding: #{convertUnit(20)} #{convertUnit(10)} #{convertUnit(20)} #{convertUnit(10)};
      box-shadow: 0 0 1px rgba(167,167,167,0.3);

      .columns {
        margin: 0;

        * {
          box-sizing: border-box;
        }
      }

      .name {
        padding-left: convertUnit(10);
        padding-right: 0;
      }

      .date {
        margin-right: $space;
      }

      .amount {
        padding: convertUnit(8) 0;

        .arrow {
          margin-top: convertUnit(5);
        }

        .column {
          padding: 0;
        }
      }
    }
  }

  .empty__photo {
    font-size: convertUnit(110);
    line-height: convertUnit(110);
    margin-bottom: convertUnit(40);
  }
}
</style>
